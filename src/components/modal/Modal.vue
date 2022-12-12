<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">{{this.title}}</slot>
          </div>
          <div class="modal-body">
            <slot name="body">{{this.body}}</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button buttonModal btnConfirm"
                @click="$emit('confirm')">
                <font-awesome-icon icon="fa-solid fa-check" class="iconConfirm" />Sim
              </button>
              <button
                class="modal-default-button buttonModal btnCancel"
                @click="$emit('close')">
                <font-awesome-icon icon="fa-solid fa-times" class="iconCancel" />Não
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  props: {
    show: Boolean,
    title: String,
    body: String,
  }
}
</script>