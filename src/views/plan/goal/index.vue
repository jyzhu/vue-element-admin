<template>
  <div class="financing-container">
    <div style="margin-bottom:15px;">
      <el-row :gutter="0">
        <div class="chart-wrapper">
          <label class="label" for="capitalInput">本金:
            <el-input-number v-model="capitalInput" :step="500" name="capitalInput"/>
          </label>
          <p/>
          <label class="label" for="assetRadioCashInput">现金类:
            <el-input-number v-model="assetRadioCashInput" :step="0.01" name="assetRadioCashInput"/>
          </label>
          <label class="label" for="assetRadioFixedInput">固收类:
            <el-input-number v-model="assetRadioFixedInput" :step="0.01" name="assetRadioFixedInput"/>
          </label>
          <label class="label" for="assetRadioEquityInput">权益类:
            <el-input-number v-model="assetRadioEquityInput" :step="0.01" name="assetRadioEquityInput"/>
          </label>

          <button class="calcBtn example-btn" @click="calculate">计算</button>
        </div>
      </el-row>

      <el-row :gutter="0">
        <!--<el-col :xs="24" :sm="24" :lg="8">-->
        <div class="chart-wrapper">
          <label class="label">建议资产配置比例：</label>
          <label class="label">现金类：{{ asset.cash }} (占{{ assetRadio.cash * 100 }}%)</label>
          <label class="label">固收类：{{ asset.fixed }} (占{{ assetRadio.fixed * 100 }}%)</label>
          <label class="label">权益类：{{ asset.equity }} (占{{ assetRadio.equity * 100 }}%)</label>
        </div>
        <!--</el-col>-->
      </el-row>

      <el-row :gutter="0">
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <pie-chart :chart-data="asset"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PieChart from './components/PieChart'

export default {
  components: {
    PieChart
  },
  data() {
    return {
      // message: 'Hello Vue.js!',
      capitalInput: this.$store.getters.capital,
      assetRadioCashInput: this.$store.getters.ratio.cash,
      assetRadioFixedInput: this.$store.getters.ratio.fixed,
      assetRadioEquityInput: this.$store.getters.ratio.equity
    }
  },
  computed: {
    capital() {
      return this.$store.getters.capital
    },
    asset() {
      if (this.capitalInput) {
        this.$store.commit('calculate')
      }
      return this.$store.getters.asset
    },
    assetRadio() {
      return this.$store.getters.ratio
    }
  },
  methods: {
    calculate: function() {
      // alert(this.capitalInput)
      // this.message = this.message.split('').reverse().join('')
      debugger
      if (this.assetRadioCashInput && this.assetRadioFixedInput && this.assetRadioEquityInput) {
        const value = this.assetRadioCashInput + this.assetRadioEquityInput + this.assetRadioFixedInput
        if (value !== 1.00) {
          alert('配置百分比需要为1。')
        }
      }
      if (this.capitalInput) {
        this.$store.commit('SET_CAPITAL', this.capitalInput)
        this.$store.commit('SET_ASSET_RATIO_CASH', this.assetRadioCashInput)
        this.$store.commit('SET_ASSET_RATIO_FIXED', this.assetRadioFixedInput)
        this.$store.commit('SET_ASSET_RATIO_EQUITY', this.assetRadioEquityInput)
        this.$store.commit('calculate')
      }
      console.log('Calculating...')
    }
  }
}
</script>

<style scoped>
  .financing-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
  }

  .example-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 500;
    text-align: center;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    padding: 4px 15px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    position: relative;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    border-color: #d9d9d9;
  }

  .example-btn:hover {
    color: #4AB7BD;
    background-color: #fff;
    border-color: #4AB7BD;
  }
  .example {
    font-size: 50px;
    color: #F6416C;
    display: block;
    margin: 10px 0;
    text-align: center;
    font-size: 80px;
    font-weight: 500;
  }

  .label {
    color: #2f4f4f;
    font-size: 16px;
    display: inline-block;
    margin: 15px 30px 15px 0;
  }

  input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 120px;
    height: 28px;
    cursor: text;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .calcBtn {
    margin-left: 20px;
    font-size: 20px;
    color: #30B08F;
    background-color: #fff;
  }

  .calcBtn:hover {
    background-color: #30B08F;
    color: #fff;
    border-color: #30B08F;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
</style>
