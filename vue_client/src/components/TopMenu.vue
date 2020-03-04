<template>
    <div class="menu">
        <div class="menuitem">Home</div>
        <div class="menuitem">Load CSV Files</div>
        <div class="menuitem">Load XML Files</div>
        <div class="menuitem">Records</div>
        <div class="menuitem">Download Reports</div>
        <div class="menuitem">CSV Download</div>
        <div class="menuitem">Sign Off</div>
    </div>
</template>

<script>
    export default {
        name: 'top-menu',
    }
</script>

<style scoped>
.menu {
    width: 80%;
}
.menuitem {
    background-color: #e6eefa;
    margin: 0.2em;
    color: #7492c1;
    text-align: center;
    display: inline-block;
    width: 150px;
}
</style>