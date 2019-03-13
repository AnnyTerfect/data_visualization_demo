<template>
	<div>
		<md-button :disabled="true" @click="addColumn" class="md-raised md-primary">
			Add Column
		</md-button>
		<md-button @click="addRow" class="md-raised md-primary">
			Add Row
		</md-button>
		<md-button @click="sendData" class="md-raised md-primary">
			Update Data
		</md-button>

		<md-content class="row">
			<md-field
				class="input"
				v-for="(title, index) in table.titles" :key="index"
			>
				 <label>Title{{ index + 1 }}</label>
			      <md-input v-model="title.value"></md-input>
			</md-field>
		</md-content>

		<md-content
			class="row"
			v-for="(row, index) in table.rows"
			:key="index"
		>
			<md-field
				class="input"
				v-for="(cell, index) in row" :key="index"
			>
				<label>Data</label>
			    <md-input v-model="cell.value"></md-input>
			</md-field>
		</md-content>
	</div>
</template>

<style scoped>
	div {
		outline: none;
	}

	.row {
		display: flex;
	}

	.input {
		flex: 1;
		margin: 10px;
	}

	.editing {
		opacity: 0.5;
	}
</style>

<script>
	export default {
		name: 'upload',
		props: ['table'],
		methods: {
			addColumn: function () {
				this.table.titles.push({ value: '' })

				for (let i = 0; i < this.table.rows.length; i++) {
					this.table.rows[i].push({ value: '' })
				}
			},

			addRow: function () {
				let _row = []

				for (let j = 0; j < this.table.titles.length; j++) {
					_row.push({ value: '' })
				}

				this.table.rows.push(_row)
			},

			sendData: function () {
				this.$emit('tableUpdate', { titles: this.table.titles, rows: this.table.rows})
			}
		}
	}

</script>