<template>
    <div>
        <b-form>
            <BInputGroup size="lg">
                <b-form-input id="floatingname" type="search" placeholder="Search by name" name="search"
                    @input="search" />
            </BInputGroup>
        </b-form>
    </div>
</template>

<script setup type="ts">
// import { defineEmits, } from 'vue';
const emit = defineEmits(['update:search']);
const search = (e) => {
    emit('search', e.target.value)
}
</script>

<style lang="scss" scoped></style>