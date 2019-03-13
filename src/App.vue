<template>
	<div id="App" class="page-container md-layout-row">
		<md-app>
			<md-app-toolbar class="md-primary">
				<span class="md-title">统计图</span>
			</md-app-toolbar>

			<md-app-drawer md-permanent="full">
				<md-toolbar class="md-transparent" md-elevation="0">
					导航
				</md-toolbar>

				<md-list>
					<md-list-item>
						<md-icon>cloud_upload</md-icon>
						<router-link class="md-list-item-text" to="/upload">上传数据</router-link>
					</md-list-item>

					<md-list-item>
						<md-icon>bar_chart</md-icon>
						<router-link class="md-list-item-text" to="/barGraph">条形图</router-link>
					</md-list-item>

					<md-list-item>
						<md-icon>show_chart</md-icon>
						<router-link class="md-list-item-text" to="/lineGraph">曲线图</router-link>
					</md-list-item>

					<md-list-item>
						<md-icon>pie_chart</md-icon>
						<router-link class="md-list-item-text" to="/pieGraph">饼图</router-link>
					</md-list-item>

				</md-list>
			</md-app-drawer>

			<md-app-content>
				<router-view
					@tableUpdate="tableUpdate"
					:table="table"
				/>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data: function () {
			return {
				titles: [
					{ value: '' },
					{ value: '' }
				],

				rows: [

				]
			}
		},
		computed: {
			table: function () {
				return { 'titles': this.titles, 'rows': this.rows }
			}
		},
		methods: {
			tableUpdate: function (data) {
				let url = '/api/post'
				this.table = data
				this.axios.post(url, data)
					.then(res => {
					// 成功回调
					}, res => {
					// 错误回调
					})
				}
		},
	}
</script>

<style scoped>
	@import './../static/css/googlefonts.css';
	.page-container {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.md-app {
		height: 100%;
		border: 1px solid rgba(#000, .12);
	}

	.md-drawer {
		width: 230px;
		max-width: calc(100vw - 125px);
	}

	.md-list-item-text {
		color: rgba(0, 0, 0, 0.54) !important;
	}

	.md-list-item-text:hover {
		text-decoration: none;
	}
</style>