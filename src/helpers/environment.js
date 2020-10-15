let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'ana-tripp-it-client.herokuapp.com':
        APIURL = 'https://ana-tripp-it-server.herokuapp.com'
}

export default APIURL;  