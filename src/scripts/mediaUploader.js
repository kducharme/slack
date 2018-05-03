const mediaUploader = () => {
    let reader = new FileReader();
    let file = document.querySelector('input[type=file]').files[0];

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

const uploadButton = document.querySelector('#uploadFile').addEventListener('click', mediaUploader);