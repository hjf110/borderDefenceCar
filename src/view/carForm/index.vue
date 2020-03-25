<template>
    <div style="height: 100%; position: relative;">

        <div style="height: 90%;padding: 5px;overflow-y: auto;">

            <van-cell-group>

                <van-field v-model="form.department" label="用车部门" placeholder="请输入用车部门" input-align="right"></van-field>
            </van-cell-group>

            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.user" label="用车人" placeholder="请输入用车人" input-align="right"></van-field>
            </van-cell-group>

            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.reason" rows="3" autosize label="用车事由" type="textarea" placeholder="请输入事由" input-align="right"></van-field>
            </van-cell-group>
            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.placefrom" label="始发地点" placeholder="请输入始发地点" input-align="right"></van-field>
            </van-cell-group>
            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.placeto" label="目的地" placeholder="请输入目的地" input-align="right"></van-field>
            </van-cell-group>
            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.placeback" label="返回地点" placeholder="请输入返回地点" input-align="right"></van-field>
            </van-cell-group>
            <van-cell-group style="margin-top: 10px;">
                <!-- 选择计划外出时间 -->
                <van-field readonly clickable label="计划外出时间" v-model="form.outtime" placeholder="选择计划外出时间" @click="pop.outtime = true" input-align="right" is-link></van-field>
                <van-popup v-model="pop.outtime" position="bottom">
                    <van-datetime-picker type="datetime" :min-date="minDate" @confirm="chooseOutTime" @cancel="pop.outtime=false"></van-datetime-picker>
                </van-popup>

                <!-- 计划归队时间 -->
                <van-field readonly clickable label="计划归队时间" v-model="form.intime" placeholder="选择计划归队时间" @click="pop.intime = true" input-align="right" is-link></van-field>
                <van-popup v-model="pop.intime" position="bottom">
                    <van-datetime-picker type="datetime" :min-date="minDate" @confirm="chooseInTime" @cancel="pop.intime=false"></van-datetime-picker>
                </van-popup>
            </van-cell-group>

            <div v-for="(item, idx) in carInfo" :key="idx">
                <div style="margin-top: 10px;position: relative;height: 20px;font-size: 10px;">
                    <div style="position: absolute;left: 10px;color: gray;">车辆明细({{ idx + 1 }})</div>
                    <div v-if="carInfo.length>1" @click="delCarInfo(idx)" style="position: absolute;right: 10px;color: cornflowerblue;">删除
                    </div>
                </div>
                <van-cell-group style="margin-top: 5px;">
                    <!-- 选择计划外出时间 -->
                    <van-field readonly clickable label="车辆类型" :value="item.cartype" placeholder="选择车辆类型" @click="clickCarType(idx)" input-align="right" is-link></van-field>
                    <van-field readonly clickable label="车牌号码" :value="item.carno" placeholder="选择车辆类型" @click="clickCarNo(idx)" input-align="right" is-link></van-field>

                    <van-field :value="item.model" label="厂牌型号" placeholder="" readonly input-align="right"></van-field>

                    <van-field v-model="item.driver" label="驾驶员" placeholder="请输入驾驶员姓名" input-align="right"></van-field>

                    <van-field readonly clickable label="派车方式" :value="item.applyway" placeholder="选择派车方式" @click="clickApplyWay(idx)" input-align="right" is-link>
                    </van-field>
                    <van-field v-model="item.otherrequire" rows="3" autosize label="其它要求" type="textarea" placeholder="请输入" input-align="right">
                    </van-field>


                </van-cell-group>
            </div>
            <div style="margin-top:5px;text-indent: 2em;font-size: 10px;color: gray;">如需多种车型,请点击"增加车辆"</div>
            <div @click="addCarInfo" style="background:white;width: 100%;height: 40px;text-align: center;line-height: 40px;margin-top: 5px;color: #20a0ff">
                <van-icon style="position: relative;top:2px;" name="plus" color="#20a0ff"></van-icon>&nbsp;增加车辆
            </div>

            <van-cell-group style="margin-top: 10px;">
                <van-field v-model="form.remark" rows="3" autosize label="备注" type="textarea" placeholder="请输入" input-align="right">
                </van-field>
            </van-cell-group>

            <van-cell-group style="margin-top: 10px;padding: 5px;">
                <div style="position: relative;left:10px;">
                    <div style="width: 100%;height: 40px;line-height: 40px;">图片</div>
                    <van-uploader :after-read="afterRead" v-model="pics" capture="camera" @delete="deleteImg"></van-uploader>
                </div>
            </van-cell-group>

            <van-cell-group style="margin-top: 10px;">
                <van-field readonly clickable label="审批人" :value="ddapprover.name" placeholder="请选择审批人" @click="pop.ddapprover = true" input-align="right" is-link></van-field>
            </van-cell-group>


            <van-cell-group style="margin-top: 10px;">
                <van-field readonly clickable label="抄送人" :placeholder="ddcclist.result.length>0?ddcclist.msg:'请选择抄送人'" @click="pop.ddccList = true" input-align="right" is-link></van-field>
            </van-cell-group>


            <van-popup v-model="pop.ddccList" position="bottom" :style="{ height: '100%' }">
                <div style="width: 100%;height: 100%;position: relative;">


                    <div style="width:100%;height:15%;">
                        <van-search placeholder="请输入搜索关键词" v-model="ddcclist.keyword"></van-search>
                        <div>
                            <van-button style="margin-left: 10px;" type="primary" size="small" @click="checkAll">全选
                            </van-button>
                            <van-button style="margin-left: 10px;" type="info" size="small" @click="toggleAll">反选
                            </van-button>
                        </div>
                    </div>
                    <div style="height:78%;overflow-y: auto;">
                        <van-checkbox-group v-model="ddcclist.result" ref="checkboxGroup">
                            <van-cell-group>
                                <van-cell v-for="(item, index) in ccList" clickable :key="index" :title="item.name" @click="toggle(index)">
                                    <van-checkbox :name="item.unionid" ref="checkboxes" slot="right-icon"></van-checkbox>
                                </van-cell>
                            </van-cell-group>
                        </van-checkbox-group>
                    </div>
                    <div style="height:7%;overflow: hidden;">
                        <div style="display: inline-block;width: 33.33%;text-align: left;">
                            <van-button @click="closeDDccList" style="margin-top: 6%;margin-left: 2%" type="default" size="small">取消
                            </van-button>
                        </div>
                        <div style="display: inline-block;width: 33.33%;text-align: center;">
                            <!--                            <van-button @click="pop.checkddccList=true" style="margin-top: 6%;margin-left: 2%" type="primary" size="small" >查看已选择({{ddcclist.result.length}})</van-button>-->
                        </div>
                        <div style="display: inline-block;width: 33.33%;text-align: right;">
                            <van-button @click="successCheckDDccList" style="margin-top: 6%;margin-right: 2%" type="info" size="small" :disabled="ddcclist.result.length==0">
                                确定({{ddcclist.result.length}}/{{ddcclist.data.length}})
                            </van-button>
                        </div>

                    </div>
                </div>
            </van-popup>
            <!--            <van-popup v-model="pop.checkddccList" position="bottom"  closeable :style="{ height: '100%' }">-->

            <!--            </van-popup>-->


            <van-popup v-model="pop.cartype" position="bottom">
                <van-picker show-toolbar title="车辆类型" :columns="select.cartype" @cancel="pop.cartype = false" @confirm="onConfirmCartype"></van-picker>
            </van-popup>

            <van-popup v-model="pop.carno" position="bottom">
                <van-picker show-toolbar title="车牌号码" :columns="carTypeNo" @cancel="pop.carno = false" @confirm="onConfirmCarno"></van-picker>
            </van-popup>
            <van-popup v-model="pop.applyway" position="bottom">
                <van-picker show-toolbar title="派车方式" :columns="select.applyway" @cancel="pop.applyway = false" @confirm="onConfirmApplyway"></van-picker>
            </van-popup>
            <van-popup v-model="pop.ddapprover" position="bottom">
                <van-picker show-toolbar title="审批人" :columns="select.ddapprover" @cancel="pop.ddapprover = false" @confirm="onConfirmDdapprover">
                </van-picker>
            </van-popup>
            <div style="height: 10px;width: 100%;">

            </div>
        </div>
        <div style="height: 10%;position: absolute;bottom: 0;width: 100%;text-align: center;background-color: white;">
            <van-button :loading="isLoading" :disabled="isLoading" @click="submit" type="info" style="border-radius: 8px;width: 90%;margin-top: 4%;">
                {{isLoading?'提交中':'提交'}}
            </van-button>
        </div>
    </div>
</template>

<script>
    import { getCarInfo, createApply, uploadImg, ddapprover, getDDid } from "../../api";
    // import dd from "dingtalk-jsapi";
    import { Toast, Notify } from 'vant';
    import dd from "dingtalk-jsapi";

    // import Notify from "vant/es/notify";


    export default {
        data() {
            return {
                isLoading: false,
                code: "",
                minHour: 10,
                maxHour: 20,
                minDate: new Date(),
                // maxDate: new Date(2099, 10, 1),
                select: {
                    cartype: ['执法执勤', '机要通讯', '应急保障', '特种车', '其它'], //车辆类型
                    carno: [], //车牌号
                    applyway: ['一进一出', '多进多出'], //派车方式
                    ddapprover: [],
                    allcarInfo: [], //所有的车辆信息
                },
                pop: { //弹窗显示隐藏
                    intime: false, //回来时间弹出框
                    outtime: false, //出发时间弹出框
                    cartype: false, //车辆类型
                    carno: false, //车牌号
                    applyway: false, //派车方式
                    ddapprover: false, //审批人
                    ddccList: false, //抄送人
                    checkddccList: false, //查看已选择的抄送人
                },
                carNoList: [],
                carInfoIdx: '', //点击的索引
                carInfo: [{
                    cartype: '', //车辆类型
                    carno: '', //车牌号码
                    model: '', //厂牌型号
                    driver: '', //驾驶员
                    applyway: '', //派车方式
                    otherrequire: '' //其他要求
                }],
                ddapprover: {
                    name: "",
                    infoList: []
                },
                ddcclist: {
                    result: [], //结果集
                    keyword: "",
                    data: [],
                    msg: '',
                },
                pics: [],
                form: {
                    ddunionid: "", //发起人userID
                    department: "", //用车部门
                    user: "", //用车人
                    reason: "", //用车事由
                    placefrom: "", //始发地点
                    placeto: "", //目的地
                    placeback: "", //返回地点
                    remark: "", //备注
                    pics: [], //图片
                    ddapprover: "", //审批人id
                    ddcclist: "", //
                    outtime: '', //计划外出时间
                    intime: '' //计划归队时间
                }
            };
        },
        computed: {
            ccList() {
                let reg = new RegExp(this.ddcclist.keyword);

                if (this.ddcclist.keyword) {
                    return (this.ddcclist.data).filter(item => item.name.match(reg))
                } else {
                    return this.ddcclist.data
                }
            },
            carTypeNo() {
                let type = this.carInfo[this.carInfoIdx]?this.carInfo[this.carInfoIdx].cartype:'';
                console.log('----------',type);
                let aa = [];
                if (type) {
                    console.log('进入-------',this.select.allcarInfo);
                    this.select.allcarInfo.forEach(item => {
                        if (item.cartype === type) {
                            aa.push(item.carno);
                        }
                    })
                } else {
                    this.select.allcarInfo.forEach(item => {
                        aa.push(item.carno);
                    })
                }
console.log('返回的车牌号为-------',aa);
                return aa;
            }
        },
        created() {
            const _this = this;
            //获取车牌号详情
            getCarInfo().then(res => {
                console.log(res);
                this.carNoList = res.data; //车牌号详细信息数组
                res.data.forEach((obj, idx) => {
                    this.select.carno.push(obj.carno); //车牌号数组
                });
                this.select.allcarInfo = res.data;

            }).catch(err => {

            });

            //获取所有用户
            ddapprover().then(res => {
                console.log('获取所有用户----', res);
                this.ddapprover.infoList = res.data;
                this.ddcclist.data = res.data;
                res.data.forEach((obj, idx) => {
                    if (obj.name == "陈晓华" || obj.name == "金诚" || obj.name == "汤国峰" || obj.name == "周盛" || obj.name == "蒋红" || obj.name == "余胜利" || obj.name == "潘贵平" || obj.name == "刘旭东" || obj.name=="唐尹龙")
                        this.select.ddapprover.push(obj.name);
                });
                // res.data.forEach((obj, idx) => {
                //     // if(obj.name=="陈晓华"||obj.name=="金诚"||obj.name=="汤国峰"||obj.name=="周盛"||obj.name=="蒋红"||obj.name=="余胜利"||obj.name=="潘贵平"||obj.name=="刘旭东")
                //     this.select.ddapprover.push(obj.name);
                // });

            }).catch(err => {
                Notify({ type: 'danger', message: err });
            });


        },
        mounted() {
            const _this = this;
            dd.ready(function() {
                // dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
                dd.runtime.permission.requestAuthCode({
                    corpId: "ding18ee1f1460a077ab35c2f4657eb6378f",
                    onSuccess: function(result) {
                        let code = result.code;
                        // _this.code = code;

                        getDDid({ code: code }).then(res => {
                            _this.form.ddunionid = res.data;
                            // dd.device.notification.alert({
                            //     message: res.data,
                            //     title: "成功", //可传空
                            //     buttonName: "好的",
                            //     onSuccess: function () {
                            //         //onSuccess将在点击button之后回调
                            //         /*回调*/
                            //     },
                            //     onFail: function (err) {
                            //     }
                            // });
                        }).catch(err => {
                            dd.device.notification.alert({
                                message: err,
                                title: "错误信息", //可传空
                                buttonName: "好的",
                                onSuccess: function() {
                                    //onSuccess将在点击button之后回调
                                    /*回调*/
                                },
                                onFail: function(err) {}
                            });
                        })

                    },
                    onFail: function(err) {
                        dd.device.notification.alert({
                            message: err,
                            title: "错误", //可传空
                            buttonName: "好的",
                            onSuccess: function() {
                                //onSuccess将在点击button之后回调
                                /*回调*/
                            },
                            onFail: function(err) {}
                        });
                    }

                });


            });
        },
        components: {},
        methods: {
            successCheckDDccList() { //确定抄送人选择
                if (this.ddcclist.result.length < 5) {
                    let aa = [];
                    this.ddcclist.data.forEach((obj, idx) => {
                        this.ddcclist.result.forEach((obj2, idx2) => {
                            if (obj2 === obj.unionid) {
                                aa.push(obj.name);
                            }
                        });
                    });
                    this.ddcclist.msg = aa.join(',');
                } else {
                    let a;
                    this.ddcclist.data.forEach((obj, idx) => {
                        if (obj.unionid === this.ddcclist.result[0]) {
                            a = obj.name;
                        }
                    });
                    this.ddcclist.msg = a + "等 " + this.ddcclist.result.length + "人"
                }
                this.pop.ddccList = false; //关闭抄送人选择

                this.form.ddcclist = this.ddcclist.result.join(',');
            },
            closeDDccList() { //取消抄送人选择
                this.pop.ddccList = false; //关闭抄送人选择
                this.ddcclist.result = []; //清空值
            },
            checkAll() {
                this.$refs.checkboxGroup.toggleAll(true);
            },
            toggleAll() {
                this.$refs.checkboxGroup.toggleAll();
            },
            /**
             * 抄送人员复选框
             * @param index
             */
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            },
            deleteImg(file, info) {
                console.log("点击了删除按钮");
                // console.log(file);
                // console.log(ids);
                this.form.pics.splice(info.index, 1);
            },
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                uploadImg(file).then(res => {
                    console.log(res.data.url);
                    this.form.pics.push(res.data.url);
                    console.log(this.form.pics);
                }).catch(err => {
                    console.log(err)
                });
                console.log(file);
            },
            delCarInfo(idx) {
                this.carInfo.splice(idx, 1);
            },
            //添加车辆明细
            addCarInfo() {
                this.carInfo.push({
                    cartype: '', //车辆类型
                    carno: '', //车牌号码
                    model: '', //厂牌型号
                    driver: '', //驾驶员
                    applyway: '', //派车方式
                    otherrequire: '' //其他要求
                })
            },
            chooseOutTime(value) {
                this.form.outtime = this.$ValidateUtil.getTime(3, value);
                this.pop.outtime = false;
            },
            chooseInTime(value) {
                this.form.intime = this.$ValidateUtil.getTime(3, value);
                this.pop.intime = false;
            },
            //选择车辆类型
            clickCarType(idx) {
                this.carInfoIdx = idx; //哪个车辆明细
                this.pop.cartype = true;
            },
            //选择车牌号
            clickCarNo(idx) {
                this.carInfoIdx = idx; //哪个车辆明细
                this.pop.carno = true;
            },
            //选择派车方式
            clickApplyWay(idx) {
                this.carInfoIdx = idx; //哪个车辆明细
                this.pop.applyway = true;
            },

            onConfirmCartype(value, index) {
                console.log(value);
                this.carInfo[this.carInfoIdx].cartype = value;

                this.carInfo[this.carInfoIdx].carno = '';
                this.carInfo[this.carInfoIdx].model = '';

                this.pop.cartype = false;
            },
            onConfirmCarno: function(value, index) {
                console.log(value);
                this.carInfo[this.carInfoIdx].carno = value; //赋值车牌号
                this.carNoList.forEach((obj, idx) => {
                    // console.log('------------',obj);
                    if (obj.carno == value) {
                        // console.log(obj.model);
                        this.carInfo[this.carInfoIdx].model = obj.model;
                    }
                });
                this.pop.carno = false;
            },
            onConfirmApplyway(value, index) {
                console.log(value);
                this.carInfo[this.carInfoIdx].applyway = value;
                this.pop.applyway = false;
            },
            onConfirmDdapprover(value, idx) {
                console.log(idx);
                this.ddapprover.name = value;
                this.ddapprover.infoList.forEach((obj, idx) => {
                    if (obj.name == value) {
                        this.form.ddapprover = obj.unionid;
                    }
                });
                // this.form.ddapprover = this.ddapprover.infoList[idx].unionid;
                this.pop.ddapprover = false;
            },
            clearForm() {
                this.form.department = '';
                this.form.user = '';
                this.form.reason = '';
                this.form.placefrom = '';
                this.form.placeto = '';
                this.form.placeback = '';
                this.form.remark = '';
                this.form.pics = [];
                this.form.ddapprover = '';
                this.form.ddcclist = '';
                this.form.outtime = '';
                this.form.intime = '';

                this.carInfo = [{
                    cartype: '', //车辆类型
                    carno: '', //车牌号码
                    model: '', //厂牌型号
                    driver: '', //驾驶员
                    applyway: '', //派车方式
                    otherrequire: '' //其他要求
                }];
                this.ddcclist.result = [];
                this.pics = [];
            },
            submit() {
                
                let val = {};
                val.apply = this.form;
                val.applyDetails = this.carInfo;

                console.log('val--------', val);
                let aa = true;
                this.carInfo.forEach(item => {
                    if (!item.driver) {
                        aa = false;
                    }
                })


                if (!this.form.ddapprover) {
                    Toast.fail('审批人不能为空');
                } else if (!aa) {
                    Toast.fail('驾驶员不能为空');
                } else {
                    this.isLoading = true;
                    createApply(val).then(res => {
                        this.isLoading = false;
                        console.log(res);

                        const t1 = Toast.success({
                            message: '提交成功,请手动关闭页面或等待 20 秒后再次提交',
                            forbidClick: true, //禁止背景点击
                            duration: 20000, //8秒显示
                        });

                        let second = 20;
                        const timer = setInterval(() => {
                            second--;
                            if (second) {
                                t1.message = `提交成功,请手动关闭页面或等待 ${second} 秒后再次提交`;
                            } else {
                                clearInterval(timer);
                                // 手动清除 Toast
                                Toast.clear();
                            }
                        }, 1000);
                        this.clearForm(); //清空表单的值
                    }).catch(err => {
                        this.isLoading = false;
                        Notify({ type: 'danger', message: err });
                        console.log(err);
                    })
                }



            }
        }
    };
</script>

<style scoped></style>