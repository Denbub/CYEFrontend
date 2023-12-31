import { Construct } from "constructs";
import {
  App,
  DataTerraformRemoteStateS3,
  Fn,
  S3Backend,
  TerraformStack,
  TerraformVariable,
  Token,
} from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws";
import { EKSCredentials } from "./src/DTO/EKSCredentials";
import { KubernetesProvider } from "@cdktf/provider-kubernetes";
import { Application } from "./src/Application";

const region = "eu-central-1";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    const stateS3 = new DataTerraformRemoteStateS3(this, "state-infra", {
      bucket: "strudle-infra",
      key: "infra-995148510543",
      region,
    });

    const eksCred = new EKSCredentials(
      Token.asString(stateS3.get("cluster_endpoint_output")),
      Token.asString(stateS3.get("cluster_id_output")),
      Fn.base64decode(
        Token.asString(stateS3.get("cluster_certificate_authority_data_output"))
      )
    );

    new AwsProvider(this, "Aws", {
      region,
      defaultTags: {
        tags: {
          Environment: "stage",
        },
      },
    });

    new KubernetesProvider(this, "k8s", {
      host: eksCred.endpoint,
      clusterCaCertificate: eksCred.base64DecodedCertificateAuthorityData,
      exec: {
        apiVersion: "client.authentication.k8s.io/v1alpha1",
        command: "aws",
        args: ["eks", "get-token", "--cluster-name", eksCred.name],
      },
    });

    const imageId = new TerraformVariable(this, "imageTag", {
      type: "string",
      description: "What AMI to use to create an instance",
      nullable: false,
    });

    const googleMapApi = new TerraformVariable(this, "googleMapApi", {
      type: "string",
      description: "Google map api key",
      nullable: false,
    });

    const bingsMapApi = new TerraformVariable(this, "bingsMapApi", {
      type: "string",
      description: "Bings Map Api key",
      nullable: false,
    });

    new Application(this, "application", imageId.value, googleMapApi.value, bingsMapApi.value);
  }
}

const app = new App();
const stack = new MyStack(app, "cye-nextjs-frontend");
new S3Backend(stack, {
  bucket: "strudle-infra",
  key: "cye-nextjs-frontend",
  region,
});

app.synth();
