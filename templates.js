<template id="formcomponentWithMustache">
    <div>
        <label for="name">name:</label>
        <input name="name" id="name" type="text" />
        <button id="btn" name="button">{{btnText}}</button>
        <div id="display">{{displayText}}</div>
    </div>
</template>