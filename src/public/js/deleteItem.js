function deleteItem(id) {
    console.log(id)
    fetch(`/home/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        console.log(res);
        location.reload();
    })
    .catch(err => console.log(err))
}