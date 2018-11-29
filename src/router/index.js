import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');


const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/addGoods',
			component: addGoods,
			meta: ['添加数据', '添加商品'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
