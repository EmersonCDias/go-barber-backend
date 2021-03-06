import IParseMailTemplatesDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplatesDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplatesDTO;
}
