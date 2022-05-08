import axios from 'axios';
import { environment } from '../environments/environment';

const instance = axios.create({
  baseURL: environment.apiUrl,
});

export default instance;
