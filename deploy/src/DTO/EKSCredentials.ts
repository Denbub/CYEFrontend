
export class EKSCredentials
{
    readonly endpoint: string;
    readonly name: string;
    readonly base64DecodedCertificateAuthorityData: string;

    constructor(endpoint: string, name: string, base64DecodedCertificateAuthorityData: string) {
        this.endpoint = endpoint;
        this.name = name;
        this.base64DecodedCertificateAuthorityData = base64DecodedCertificateAuthorityData;
    }
}