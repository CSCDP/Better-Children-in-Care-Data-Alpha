<template>
    <div class="upload">
        <div class="uploadHeader">{{ label }}: </div>
        <div class="uploadInput">
            <input type="file" :data-id="id" onchange="handleFile(this.files)" :accept="fileType">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'file-upload',
        props: {
            label: String,
            fileType: String,
            id: String
        },
    };
</script>

<style scoped>
.upload {
    display: block;
}

.uploadHeader {
    font-weight: bold;
    display: inline-block;
    width: 100px;
}

.uploadInput {
    display: inline-block;
}
</style>