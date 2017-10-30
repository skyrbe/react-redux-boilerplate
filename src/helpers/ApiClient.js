import superagent from 'superagent';
import { APIConfig } from '../constants';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const HOSTNAME = APIConfig.hostname;
const ENDPOINTS = APIConfig.endpoints;

function formatUrl(path) {
  let mappedEndpoint = ENDPOINTS[path];
  if(path.indexOf('/') !== -1) {
    mappedEndpoint = "";
    let splitPathArray = path.split('/');
    mappedEndpoint += ENDPOINTS[splitPathArray[0]]+'/';
    splitPathArray.shift();
    mappedEndpoint += splitPathArray.join('/')
  }
  const adjustedPath = mappedEndpoint[0] !== '/' ? HOSTNAME + '/' + mappedEndpoint : HOSTNAME + mappedEndpoint;
  return adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, headers, files, fields } = {}) => new Promise((resolve, reject) => {
        let request = superagent[method](formatUrl(path));
        console.log("request is ", request);
        if(path.indexOf('fakeapi') !== -1) {
          let fakePath = path;
          let splitPathArray = fakePath.split('/');
          splitPathArray.shift();
          let constructedURL = splitPathArray.join('/');
          request = superagent[method](`http://localhost:3004/${constructedURL}`);
        }
        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        if (this.token) {
          request.set('Authorization', `Bearer ${this.token}`);
        }

        if (files) {
          files.forEach(file => request.attach(file.key, file.value));
        }

        if (fields) {
          fields.forEach(item => request.field(item.key, item.value));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }

  empty() {}
}
