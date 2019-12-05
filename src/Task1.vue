<template>
    <div>
        <h2>Task 1 (Calculator)</h2>
        
        <div class="repeatable" v-for="i in nFractions" v-bind:key="i">
            <div class="fraction">
                <input class="fraction__upper" type="number" v-model="values[(i-1)*2]" v-on:change="recalc()" />
                <hr /> 
                <input class="fraction__lower" type="number" v-model="values[(i-1)*2+1]" v-on:change="recalc()" />
            </div>
            <div class="operator" v-if="i !== nFractions">
                <div class="operator__wrapper">
                    <input class="operator__input" v-model="operators[i]" v-on:change="recalc()" /> 
                </div>
            </div>
        </div>
        <div class="operator" v-if="resultNumenator && resultDenominator">
            <div class="operator__wrapper">
                <span>=</span> 
            </div>
        </div>
        <div class="result" v-if="resultNumenator && resultDenominator">
            <div>{{ resultNumenator }}</div>
            <hr />
            <div>{{ resultDenominator }}</div>
        </div>
        <div v-if="isError" class="error">
            {{ errorText }}
        </div>

        <div class="btn-add" v-on:click="addFraction()">Add fraction</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            values: [],
            operators: ['+'],
            nFractions: 2,
            isError: false, 
            errorText: '',
            resultNumenator: null,
            resultDenominator: null
        }
    },
    methods: {
        addFraction() {
            this.nFractions += 1
            this.resultNumenator = null
            this.resultDenominator = null
        },
        recalc() {
            this.isError = false
            this.errorText = ''
            this.resultNumenator = null
            this.resultDenominator = null

            let accNumanator = 0
            let accDenominator = 1

            for (let i = 0; i < this.nFractions; ++i) {
                const numenatorStr = this.values[i*2]
                const denominatorStr = this.values[i*2 + 1]
                const operatorStr = this.operators[i]

                if (numenatorStr === undefined || denominatorStr === undefined || operatorStr === undefined) { 
                    return // Not enough data for calculation
                }

                if (denominatorStr === '0') {
                    this.isError = true
                    this.errorText = 'Division by 0'
                    return
                }

                if (!['+', '-', '*', '/'].includes(operatorStr)) {
                    this.isError = true
                    this.errorText = `Unsupported operator '${operatorStr}'`
                    return
                }

                const numenator = parseInt(numenatorStr)
                const denominator = parseInt(denominatorStr)

                if (operatorStr === '+' || operatorStr === '-') {
                    const NOK = this.calcNOK([accDenominator, denominator])
                    const scaledAccum = accNumanator * NOK/accDenominator
                    const scaledCurrent = numenator * NOK/denominator

                    accNumanator = eval(`${scaledAccum}${operatorStr}${scaledCurrent}`)
                    accDenominator = NOK
                } else if (operatorStr === '*') {
                    accNumanator *= numenator
                    accDenominator *= denominator
                } else if (operatorStr === '/') {
                    accNumanator *= denominator
                    accDenominator *= numenator
                }
            }

            this.resultNumenator = accNumanator
            this.resultDenominator = accDenominator
        },
        calcNOK (arr){   
            // Source: http://mathhelpplanet.com/static.php?p=javascript-nod-i-nok

            let a = Math.abs(arr[0]);
            
            for (let i = 1; i < arr.length; i++) { 
                let b = Math.abs(arr[i])
                let c = a;

                while (a && b){ 
                    if (a > b) {
                        a %= b
                    } else {
                        b %= a
                    } 
                } 

                a = Math.abs(c*arr[i])/(a+b);
            }

            return a;
        }
    }
}
</script>

<style scoped>
.repeatable {
    display: inline-block;
}

.fraction {
    display: inline-block;
    height: 5em;
}

.error {
    color: red;
}

.result { 
    width: 2em;
    display: inline-block;
}

.operator {
    display: inline-block;
    margin-right: 10px;
    margin-left: 10px;
    vertical-align: top;
    height: 5em;
}

.operator__wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
}

.operator__input { 
    width: 1.5em;
}

.fraction__upper,
.fraction__lower {
    width: 2.5em;
    display: block;
    margin-bottom: 10px;
}

.fraction__upper::after {
    content: '';
    display: block;
    border-bottom: 1px solid black;
}

.btn-add {
    color: rgb(50, 50, 50);
    text-transform: uppercase; 
    text-decoration: underline;
    cursor: pointer;
}
</style>