document.querySelector('#boton').addEventListener('click', traerDatos)

function traerDatos() {

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'catalog.json', true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText);
            let head = document.querySelector('#head');
            head.innerHTML = `
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Thumbnail</th>
                </tr>
            `;
            let res = document.querySelector('#res');
            res.innerHTML = '';
            for(let item of datos) {
                res.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.price}</td>
                    <td class="thumbnail"><a href="${item.thumbnail}" target="_blank"><img src="${item.thumbnail}"></img></a></td>
                </tr>
                `
            }
        }
    }
}