<template>
	<ve-pie :data="chartData"></ve-pie>
</template>

<style scoped>
	div {
		outline: none;
	}

	.editing {
		opacity: 0.5;
	}
</style>

<script>
	export default {
		props: ['table'],
		data: function () {
			return {
			}
    	},
    	computed: {
    		chartData: function () {
    			let _chartData = {}, _rows = []
    			let rows = this.table.rows, titles = this.table.titles
    			_chartData['columns'] = []
    			for (let i = 0; i < titles.length; i++) {
    				_chartData['columns'].push(titles[i].value)
    			}
    			for (let i = 0; i < rows.length; i++) {
    				let tempObject = {}
    				tempObject[titles[0].value] = rows[i][0].value
    				tempObject[titles[1].value] = Number(rows[i][1].value)
    				_rows.push(tempObject)
    			}
    			_chartData['rows'] = _rows
    			return _chartData
    		}
    	}
	}
</script>