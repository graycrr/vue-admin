<template>
    <div class="test">
        <h1>This is a test page</h1>
    </div>
</template>
<script>
import { Login } from '../../api/api'
import mixin from '../../utils/mixin'
export default {
  mixins: [mixin],
    data () {
        return {

        }
    },
    methods: {
    }
}
</script>
<style lang="scss">
    .test {
       width: 100%;
       height: 100%;
       text-align: center;
       margin-top: 100px;
       font-size: 30px;
    }

</style>


