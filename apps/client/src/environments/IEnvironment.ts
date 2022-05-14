export default interface IEnvironment {
  production: boolean;
  mode: 'development' | 'staging' | 'production';
  apiUrl: string;
}
