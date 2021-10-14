<template>
	<a 
		v-on:click.prevent="loadMessages"
		href="#" 
		aria-current="true" 
		class="user list-group-item list-group-item-action">
		{{userData.userName}}
	</a>
</template>

<script>

	export default {
		name: 'User',
		props: {
			userData:{}
		},
		data:function(){
			return {
			}
		},
		methods:{
			loadMessages: function(){
				this.$root.$data.currentSocketData = this.userData;
				this.$root.$emit("loadCurrentSocketData",this.userData);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
