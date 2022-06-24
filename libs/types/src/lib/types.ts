export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
