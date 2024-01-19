// data json
const xhr = new XMLHttpRequest();
xhr.open('GET', 'persons.json');  
xhr.responseType = 'json';
xhr.send();

xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(xhr.response);
    } else {
        console.error(`Request failed with status ${xhr.status}`);
    }
};
