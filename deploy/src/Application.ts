import {
  DataKubernetesNamespace,
  Deployment,
  Manifest,
  Secret,
  Service,
} from "@cdktf/provider-kubernetes";
import { Token } from "cdktf";
import { Construct } from "constructs";

export class Application extends Construct {
  private imageTag: string;
  private host: string;

  constructor(
    scope: Construct,
    id: string,
    imageTag: string,
    googleMapApi: string,
    bingsMapApi: string,
  ) {
    super(scope, id);
    this.imageTag = imageTag;
    this.host = "strudle.co";
    const userPoolClientId = "6t9702edghkf09vcsqiejefer3";
    const userPoolId = "eu-central-1_XaYRwUq54";
    const awsRegion = "eu-central-1";
    //Replace after moving cognito from backend. There isn't secrets.

    const secretData = {
      NEXT_PUBLIC_HOSTNAME: `https://${this.host}`,
      NEXT_PUBLIC_API_URL: `https://${this.host}/api`,
      DOCKER_API_BASE_URL: `https://${this.host}/api`,
      COGNITO_AUTH_URL: `https://auth.${this.host}/oauth2/`,
      NEXT_PUBLIC_COGNITO_AUTH_URL: userPoolClientId,
      NEXT_PUBLIC_CLIENT_ID: userPoolClientId,
      NEXT_PUBLIC_COGNITO_REDIRECT_URL: `https://${this.host}/account/login`,
      NEXT_PUBLIC_GOOGLE_MAPS_API: googleMapApi,
      COGNITO_USER_POOL: userPoolId,
      COGNITO_APP_ID: userPoolClientId,
      COGNITO_AWS_REGION: awsRegion,
      NEXT_PUBLIC_BING_MAPS_API: bingsMapApi
    };

    const namespace = new DataKubernetesNamespace(this, "namespace", {
      metadata: {
        name: "stage",
      },
    });

    const secretFrontend = new Secret(this, "secret-cye-nextjs-frontend", {
      data: {
        ".env": this.convertStructureToDotEnvFormat(secretData),
      },
      metadata: {
        name: "secret-cye-nextjs-frontend",
        namespace: Token.asString(namespace.metadata.name),
      },
      dependsOn: [namespace],
    });

    this.createFrontendDeployment(namespace, secretFrontend);
    this.createTraefikIngressRoute(
      namespace,
      this.createServiceFrontend(namespace),
      this.createBasicAuthMiddleware(namespace)
    );
  }

  private createFrontendDeployment(
    namespace: DataKubernetesNamespace,
    secretFrontend: Secret
  ): Deployment {
    return new Deployment(this, "frontend-deployment", {
      metadata: {
        name: "cye-nextjs-frontend",
        namespace: Token.asString(namespace.metadata.name),
      },
      spec: {
        replicas: "1",
        selector: {
          matchLabels: {
            app: "cye-nextjs-frontend",
          },
        },
        template: {
          metadata: {
            labels: {
              app: "cye-nextjs-frontend",
            },
          },
          spec: {
            container: [
              {
                name: "nextjs-frontend",
                image:
                  "995148510543.dkr.ecr.eu-central-1.amazonaws.com/strudle/cye-nextjs-frontend/frontend:" +
                  this.imageTag,
                envFrom: [
                  {
                    secretRef: {
                      name: secretFrontend.metadata.name,
                    },
                  },
                ],
                livenessProbe: {
                  httpGet: {
                    path: "/",
                    port: "3000",
                  },
                  initialDelaySeconds: 70,
                  periodSeconds: 10,
                },
                readinessProbe: {
                  httpGet: {
                    path: "/",
                    port: "3000",
                  },
                  initialDelaySeconds: 80,
                  periodSeconds: 10,
                },
                resources: {
                  requests: {
                    memory: "128Mi",
                    cpu: "500m",
                  },
                  limits: {
                    memory: "2Gi",
                    cpu: "1500m",
                  },
                },
                volumeMount: [
                  {
                    mountPath: "/app/.env",
                    name: "env-file",
                    subPath: ".env",
                  },
                ],
              },
            ],
            volume: [
              {
                name: "env-file",
                secret: {
                  secretName: secretFrontend.metadata.name,
                },
              },
            ],
          },
        },
      },
      dependsOn: [secretFrontend, namespace],
    });
  }

  private createServiceFrontend(namespace: DataKubernetesNamespace): string {
    const service = new Service(this, "service-frontend", {
      metadata: {
        namespace: Token.asString(namespace.metadata.name),
        labels: {
          app: "cye-nextjs-frontend",
        },
        name: "service-frontend",
      },
      spec: {
        port: [
          {
            port: 3000,
          },
        ],
        selector: {
          app: "cye-nextjs-frontend",
        },
      },
    });

    new Manifest(this, "traefik-service-frontend", {
      manifest: {
        apiVersion: "traefik.containo.us/v1alpha1",
        kind: "TraefikService",
        metadata: {
          namespace: Token.asString(namespace.metadata.name),
          name: "service-frontend",
        },
        spec: {
          mirroring: {
            kind: "Service",
            name: "service-frontend",
            port: 3000,
            mirrors: [
              {
                name: "service-frontend",
              },
            ],
          },
        },
      },
      dependsOn: [service],
    });

    return "service-frontend-3000";
  }

  private createBasicAuthMiddleware(
      namespace: DataKubernetesNamespace
  ): string {
    const secret = new Secret(this, 'traefik-basic-auth-secret', {
      metadata: {
        name: "basic-auth-secret",
        namespace: Token.asString(namespace.metadata.name),
      },
      type: "kubernetes.io/basic-auth",
      data: {
        username: "Strudel",
        password: "StrudelxCYE"
      }
    })
    const nameOfMiddleware = 'basic-auth-middleware'
    new Manifest(this, "traefik-basic-auth-middleware", {
      manifest: {
        apiVersion: "traefik.containo.us/v1alpha1",
        kind: "Middleware",
        metadata: {
          name: nameOfMiddleware,
          namespace: Token.asString(namespace.metadata.name),
        },
        spec: {
          basicAuth: {
            secret: secret.metadata.name
          }
        }
      }
    });

    return namespace.metadata.name + "-" +nameOfMiddleware + '@kubernetescrd';
  }

  private createTraefikIngressRoute(
    namespace: DataKubernetesNamespace,
    frontendServiceName: string,
    basicAuthMiddleware: string,
    isNeedAddAuthMiddleware: boolean = true
  ) {
    new Manifest(this, "traefik-manifest", {
      manifest: {
        apiVersion: "traefik.containo.us/v1alpha1",
        kind: "IngressRoute",
        metadata: {
          name: "traefik-manifest-cye-nextjs-frontend",
          namespace: Token.asString(namespace.metadata.name),
        },
        spec: {
          entryPoints: ["websecure", "web"],
          tls: {
            certResolver: "strudlecert",
          },
          routes: [
            {
              match:
                "Host(`" + this.host + "`) || Host(`www." + this.host + "`)",
              kind: "Rule",
              middlewares: [
                { name: "redirect-to-non-www@file" },
                isNeedAddAuthMiddleware
                  ? { name: basicAuthMiddleware }
                  : null,
              ],
              services: [
                {
                  name: frontendServiceName,
                  kind: "TraefikService",
                },
              ],
            },
          ],
        },
      },
    });
  }

  private convertStructureToDotEnvFormat(secretData: any): string {
    let string = "";

    for (let key in secretData) {
      string += `${key}=${secretData[key]}\n`;
    }

    return string;
  }
}
