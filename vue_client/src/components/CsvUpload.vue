<template>
    <div class="uploadContainer">
        <FileUpload :label="'Header'" :fileType="'.csv'" :id="'HeaderfileUpload'" />
        <FileUpload :label="'Episodes'" :fileType="'.csv'" :id="'EpisodesfileUpload'" />
        <FileUpload :label="'UASC'" :fileType="'.csv'" :id="'UASCfileUpload'"/>

        <div id="uploadFrame">

        </div>
    </div>
</template>

<script>
    import FileUpload from './FileUpload.vue'

    export default {
        name: 'csv-upload',
        components: {
            FileUpload,
        }
    }
</script>

<style scoped>
#uploadFrame {
    position:absolute;
    left: -9999px;
    top: -9999px;
}

.uploadContainer {
    background-color: white;
    height: 40vh;
    width: 80%;
    padding: 1em;
}

.upload {
    display: block;
}

.uploadHeader {
    font-weight: bold;
    display: inline-block;
}

.uploadInput {
    display: inline-block;
}
</style>
