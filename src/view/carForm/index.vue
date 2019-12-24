<template>
    <div>
        <mu-container>
            <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-position="right" label-width="120">
                <mu-form-item label="用车部门"  prop="p1" :rules="formRequerd">
                    <mu-text-field v-model="validateForm.p1" prop="p1"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="用车人"  :rules="formRequerd" prop="p2">
                    <mu-text-field v-model="validateForm.p2" prop="p2"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="用车事由"  prop="p3" :rules="formRequerd">
                    <mu-text-field
                        prop="p3"
                        v-model="validateForm.p3"
                        multi-line
                        :rows="1"
                        :rows-max="6"
                    ></mu-text-field>
                </mu-form-item>
                <mu-form-item label="始发地点"  :rules="formRequerd" prop="p4">
                    <mu-text-field v-model="validateForm.p4" prop="p4"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="目的地"  :rules="formRequerd" prop="p5">
                    <mu-text-field v-model="validateForm.p5" prop="p5"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="返回地点"  :rules="formRequerd" prop="p6">
                    <mu-text-field v-model="validateForm.p6" prop="p6"></mu-text-field>
                </mu-form-item>
                <mu-form-item label="计划外出时间"  :rules="formRequerd" prop="p7">
                    <mu-date-input
                        prop="p7"
                        v-model="validateForm.p7"
                        container="dialog"
                        full-width
                    ></mu-date-input>
                </mu-form-item>
                <mu-form-item label="计划归队时间"  :rules="formRequerd" prop="p8">
                    <mu-date-input
                        prop="p8"
                        v-model="validateForm.p8"
                        container="dialog"
                        full-width
                    ></mu-date-input>
                </mu-form-item>
                <!-- <mu-divider></mu-divider> -->
                <!-- <mu-sub-header>车辆明细--</mu-sub-header> -->
                <mu-badge content="车辆明细" color="primary"></mu-badge>
                <mu-paper class="box-paper" :z-depth="4">

                    奥术大师大所大所多
                </mu-paper>
                <!-- <mu-form-item>
                    <mu-button color="primary" @click="submit">提交</mu-button>
                    <mu-button @click="clear">重置</mu-button>
                </mu-form-item>-->
            </mu-form>
        </mu-container>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            formRequerd: [{ validate: val => !!val, message: '必填项不能为空' }],
            validateForm: {
                username: '',
                password: '',
                isAgree: false
            },
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
            ]
        };
    },
    components: {},
    methods: {
        submit() {
            this.$refs.form.validate().then(result => {
                console.log('form valid: ', result);
            });
        },
        clear() {
            this.$refs.form.clear();
            this.validateForm = {
                username: '',
                password: '',
                isAgree: false
            };
        }
    }
};
</script>

<style scoped>
.mu-demo-form {
    width: 100%;
    max-width: 460px;
}
.box {
    background: rgb(216, 210, 210);
}
.box-paper{
    margin-top: 10px;
    padding: 5px;
}
</style>