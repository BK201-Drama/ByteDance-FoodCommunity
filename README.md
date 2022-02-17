# 项目介绍

## 一. 项目简介

该美食社区是参照【下厨房】而制作的

主要功能是提供各种美食做法以及烹饪技巧，给美食爱好者们提供一个交流分享的平台。用户作为内容的创建者，可以通过平台学习内容，进行分享交流。



## 二. 功能点

### 1 菜谱首页浏览

### 2 菜谱搜索

### 3 菜谱标签查找

### 4 菜谱创建发布

### 5 菜谱收藏

### 6 菜谱评价

### 7 关注用户

### 8 注册登录



# 成员分工

| 成员   | 工作内容                                                     |
| ------ | ------------------------------------------------------------ |
| 林凯迪 | 1. 对后端部分所有接口进行编写，并进行数据库设计<br />2. 对前端部分的个人空间进行编写<br />3. 对前端部分的菜谱首页，搜索页进行编写 |
| 植秀月 | 1. 对前端部分的首页进行编写<br />2. 对前端部分的用户关注进行编写 |
| 王泽育 | 1. 对前端部分的菜谱创建进行编写<br />2. 对前端部分的登录注册进行编写<br />3. 对前端部分的标签页查询菜谱展示进行编写 |
| 何沣洛 | 1. 对前端部分的菜谱浏览进行编写<br />2. 对前端部分的菜谱评价进行编写 |



# 数据库设计

## 1 登录注册

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});
```



## 2 个人信息

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InfoSchema = new Schema({
    username: {
        type: String,
        require: true
    },
	Avatar: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    join_time: {
        type: String,
        require: true
    },	
    signature: {
        type: String
    }
});
```



## 3 关注与被关注

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AboutConcernSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    concern: [{
        username: {
            type: String,
            require: true
        },
        Avatar: {
            type: String,
            require: true
        }
    }],
    concerned: [{
        username: {
            type: String,
            require: true
        },
        Avatar: {
            type: String,
            require: true
        }
    }]
})
```



## 4 菜谱

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    menu_id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    menu_pic: {
        type: String,
        require: true
    },
    // 简介
    synopsis: {
        type: String,
        require: true
    },
    material: [{
        mat_name: {
            type: String,
            require: true
        },
        mat_weight: {
            type: String,
            require: true
        }
    }],
    practice: [{
        step: {
            type: Number,
            require: true
        },
        step_info: {
            type: String,
            require: true
        },
        step_pic: {
            type: String,
            require: true
        }
    }],
    // 分类
    classification: [{
        menu_label_id: {
            type: Number,
            require: true
        },
        classify_name: {
            type: String,
            require: true
        }
    }],
    // 小贴士
    Tips: {
        type: String,
        require: true
    },
    // 点赞数
    like_num: {
        type: Number,
        require: true
    }
})
```



## 5 菜谱-个人关系表

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuMapUser = new Schema({
    menu_id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    }
});
```



## 6 菜谱-评论关系表

在这里，没有二级评论：

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuMapComment = new Schema({
    menu_id: {
        type: String,
        require: true
    },
    comments: [{
        username: {
            type: String,
            require: true
        },
        Avatar: {
            type: String,
            require: true
        },
        comment_content: {
            type: String,
            require: true
        }
    }]
});
```



## 7 菜谱标签

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuLabel = new Schema({
    menu_label_id: {
        type: Number,
        require: true
    },
    classify_name: {
		type: String,
        require: true
    }
})
```



## 8 作品

作品不进行评论

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CookingWorks = new Schema({
    cooking_works_id: {
        type: String,
        require: true
    },
    cooking_works_pic: {
        type: String,
        require: true
    },
    experience: {
        type: String,
        require: true
    },
    like_num: {
        type: Number,
        require: true
    },
    cooking_works_time: {
        type: String,
        require: true
    }
});
```



## 9 作品-个人关系表

```js
const mongoose = require('mongoose');const Schema = mongoose.Schema;const CookingWorkMapUser = new Schema({    cooking_works_id: {        type: String,        require: true    },    username: {        type: String,        require: true    }});
```



## 10 收藏

```js
const mongoose = require('mongoose');const Schema = mongoose.Schema;const ListingSchema = new Schema({    username: {        type: String,        require: true    },    menu_id: {        type: String,        require: true    }});
```



# 技术选型

## 1 前端架构

**React框架**

**Redux状态管理工具**

**antd组件库**



## 2 后端架构

**基于字节轻服务的express框架**



## 3 数据库

**采用轻服务的云数据库**



# 接口文档

## 0 接口前缀

**前缀网址：**`https://bk201-drama.app.cloudendpoint.cn/api`



## 1 登录注册相关

### 1.1 账户登录

**方式：**POST

**路由：**`/login`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   | none |
| password | String   | none |

**返回参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   | none |
| password | String   | none |



### 1.2 账户注册

**方式：**POST

**路由：**`/sign`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   | none |
| password | String   | none |

**返回参数：**	

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   | none |
| password | String   | none |



### 1.3 修改密码

**方式：**POST

**路由：**`/updatePwd`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |
| password | String   |      |
| newPwd   | String   |      |

**返回参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |
| password | String   |      |



## 2 信息面板相关

### 2.1 个人信息面板展示

**方式：**GET

**路由：**`/info`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名        | 参数类型 | 备注     |
| ------------- | -------- | -------- |
| username      | String   |          |
| Avatar        | String   | 头像     |
| address       | String   | 地址     |
| join_time     | String   | 加入时间 |
| concern_num   | Number   | 关注人数 |
| concerned_num | Number   | 粉丝人数 |
| signature     | String   | 个性签名 |



### 2.2 其他用户信息面板展示

**方式：**GET

**路由：**`/info`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名        | 参数类型 | 备注     |
| ------------- | -------- | -------- |
| username      | String   |          |
| Avatar        | String   | 头像     |
| address       | String   | 地址     |
| join_time     | String   | 加入时间 |
| concern_num   | Number   | 关注人数 |
| concerned_num | Number   | 粉丝人数 |
| signature     | String   | 个性签名 |



### 2.3 个人菜谱列表展示

**方式：**GET

**路由：**`/menu`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名    | 参数类型 | 备注                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| username  | String   |                                                              |
| menu_list | Array    | 菜谱列表，这个返回参数之后，下面的参数全是菜谱列表内部元素对象的属性 |
| menu_id   | String   | 菜谱id                                                       |
| title     | String   | 菜谱标题                                                     |
| synopsis  | String   | 菜谱简介                                                     |
| menu_pic  | String   | 菜谱图片                                                     |
| like_num  | Number   | 点赞数                                                       |



### 2.4 个人作品列表展示

**方式：**GET

**路由：**`/cooking-work`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名             | 参数类型 | 备注                                                         |
| ------------------ | -------- | ------------------------------------------------------------ |
| username           | String   |                                                              |
| cooking_works_list | Array    | 作品列表，这个返回参数之后，下面的参数全是作品列表内元素的属性 |
| cooking_works_id   | String   | 作品id                                                       |
| cooking_works_pic  | String   | 作品图片                                                     |
| experience         | String   | 作品内容简介                                                 |
| like_num           | Number   | 作品点赞数                                                   |
| cooking_works_time | String   | 作品创建时间                                                 |



### 2.5 修改个人信息列表

**方式：**PATCH

**路由：**`/menu`

**参数：**

| 参数名        | 参数类型 | 备注     |
| ------------- | -------- | -------- |
| username      | String   |          |
| Avatar        | String   | 头像     |
| address       | String   | 地址     |
| join_time     | String   | 加入时间 |
| concern_num   | Number   | 关注人数 |
| concerned_num | Number   | 粉丝人数 |
| signature     | String   | 个性签名 |

**返回参数：**

| 参数名        | 参数类型 | 备注     |
| ------------- | -------- | -------- |
| username      | String   |          |
| Avatar        | String   | 头像     |
| address       | String   | 地址     |
| join_time     | String   | 加入时间 |
| concern_num   | Number   | 关注人数 |
| concerned_num | Number   | 粉丝人数 |
| signature     | String   | 个性签名 |



## 3 关注列表相关

### 3.1 关注列表展示

**方式：**GET

**路由：**`/concern`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名       | 参数类型 | 备注                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| concern_list | Array    | 关注列表，这个返回参数之后，下面的参数全是关注列表内元素的属性 |
| username     | String   | 关注的用户的账户                                             |
| Avatar       | String   | 关注的用户的头像                                             |



### 3.2 粉丝列表展示

**方式：**GET

**路由：**`/concerned` 

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| concerned_list | Array    | 粉丝列表，这个返回参数之后，下面的参数全是粉丝列表内元素的属性 |
| username       | String   | 关注的用户的账户                                             |
| Avatar         | String   | 关注的用户的头像                                             |

### 3.3 添加关注

**方式：**PATCH

**路由：**`/addConcern`

**参数：**

| 参数名             | 参数类型 | 备注         |
| ------------------ | -------- | ------------ |
| username           | String   | 关注者       |
| username_concerned | String   | 被关注者     |
| Avatar             | String   | 关注者头像   |
| Avatar_concerned   | String   | 被关注者头像 |

**返回参数：**

| 参数名             | 参数类型 | 备注                   |
| ------------------ | -------- | ---------------------- |
| username_concerned | String   | 是用户所关注的人的账户 |
| concerned_num      | Number   | 粉丝人数               |

### 3.4 取消关注

**方式：**PATCH

**路由：**`/cancelConcern`

**参数：**

| 参数名             | 参数类型 | 备注         |
| ------------------ | -------- | ------------ |
| username           | String   | 关注者       |
| username_concerned | String   | 被关注者     |
| Avatar             | String   | 关注者头像   |
| Avatar_concerned   | String   | 被关注者头像 |

**返回参数：**

| 参数名             | 参数类型 | 备注                   |
| ------------------ | -------- | ---------------------- |
| username_concerned | String   | 是用户所关注的人的账户 |
| concerned_num      | Number   | 粉丝人数               |



### 3.5 查看自己是否关注对方

**方式：**PATCH

**路由：**`/isConcern`

**参数：**

| 参数名             | 参数类型 | 备注     |
| ------------------ | -------- | -------- |
| username           | String   | 关注者   |
| username_concerned | String   | 被关注者 |

**返回参数：**

| 参数名     | 参数类型 | 备注                     |
| ---------- | -------- | ------------------------ |
| is_concern | Boolean  | 用于判断自己是否关注对方 |



## 4 收藏相关

【只能收藏菜谱，不能收藏作品】

### 4.1 添加收藏

**方式：**POST

**路由：**`/Listing`

**参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |

**返回参数：**

| 参数名   | 参数类型 | 备注                                           |
| -------- | -------- | ---------------------------------------------- |
| username | String   |                                                |
| listing  | Array    | 菜谱数组列表，下面的参数都是收藏菜谱的对象属性 |
| menu_id  | String   | 菜谱id                                         |
| title    | String   | 菜谱标题                                       |
| synopsis | String   | 菜谱简介                                       |
| menu_pic | String   | 菜谱图片                                       |
| like_num | Number   | 菜谱点赞数目                                   |



### 4.2 取消收藏

**方式：**POST

**路由：**`/deleteListing`

**参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |

**返回参数：**

| 参数名   | 参数类型 | 备注                                           |
| -------- | -------- | ---------------------------------------------- |
| username | String   |                                                |
| listing  | Array    | 菜谱数组列表，下面的参数都是收藏菜谱的对象属性 |
| menu_id  | String   | 菜谱id                                         |
| title    | String   | 菜谱标题                                       |
| synopsis | String   | 菜谱简介                                       |
| menu_pic | String   | 菜谱图片                                       |



### 4.3 展示收藏列表

**方式：**GET

**路由：**`/Listing`

**参数：**

| 参数名   | 参数类型 | 备注 |
| -------- | -------- | ---- |
| username | String   |      |

**返回参数：**

| 参数名   | 参数类型 | 备注                                           |
| -------- | -------- | ---------------------------------------------- |
| username | String   |                                                |
| listing  | Array    | 菜谱数组列表，下面的参数都是收藏菜谱的对象属性 |
| menu_id  | String   | 菜谱id                                         |
| title    | String   | 菜谱标题                                       |
| synopsis | String   | 菜谱简介                                       |
| menu_pic | String   | 菜谱图片                                       |



### 4.4 展示该菜谱是否已经收藏

**方式：**GET

**路由：**`/isList`

**参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |

**返回参数：**

| 参数名   | 参数类型 | 备注                   |
| -------- | -------- | ---------------------- |
| isListed | Boolean  | 判断菜谱是否已经被收藏 |



## 5 菜谱相关

### 5.1 添加个人菜谱

**方式：**POST

**路由：**`/addMenu`

**参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| username       | String   |                                                              |
| title          | String   | 菜谱标题                                                     |
| menu_pic       | String   | 菜谱封面图片                                                 |
| synopsis       | String   | 菜谱简介                                                     |
| material       | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name       | String   | 菜谱材料名称                                                 |
| mat_weight     | String   | 菜谱材料重量                                                 |
| practice       | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step           | Number   | 菜谱步骤序号                                                 |
| step_info      | String   | 菜谱步骤简介                                                 |
| step_pic       | String   | 菜谱步骤对应图片                                             |
| classification | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id  | String   | 菜谱标签id                                                   |
| classify_name  | String   | 菜谱标签名称                                                 |
| Tips           | String   | 菜谱小贴士                                                   |

**返回参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| username       | String   |                                                              |
| menu_id        | String   | 菜谱id                                                       |
| title          | String   | 菜谱标题                                                     |
| menu_pic       | String   | 菜谱封面图片                                                 |
| synopsis       | String   | 菜谱简介                                                     |
| material       | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name       | String   | 菜谱材料名称                                                 |
| mat_weight     | String   | 菜谱材料重量                                                 |
| practice       | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step           | Number   | 菜谱步骤序号                                                 |
| step_info      | String   | 菜谱步骤简介                                                 |
| step_pic       | String   | 菜谱步骤对应图片                                             |
| classification | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id  | String   | 菜谱标签id                                                   |
| classify_name  | String   | 菜谱标签名称                                                 |
| Tips           | String   | 菜谱小贴士                                                   |
| like_num       | String   | 点赞数                                                       |



### 5.2 删除个人菜谱

**方式：**POST

**路由：**`/deleteMenu`

**参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |

**返回参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| username       | String   |                                                              |
| menu_id        | String   | 菜谱id                                                       |
| title          | String   | 菜谱标题                                                     |
| menu_pic       | String   | 菜谱封面图片                                                 |
| synopsis       | String   | 菜谱简介                                                     |
| material       | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name       | String   | 菜谱材料名称                                                 |
| mat_weight     | String   | 菜谱材料重量                                                 |
| practice       | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step           | Number   | 菜谱步骤序号                                                 |
| step_info      | String   | 菜谱步骤简介                                                 |
| step_pic       | String   | 菜谱步骤对应图片                                             |
| classification | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id  | String   | 菜谱标签id                                                   |
| classify_name  | String   | 菜谱标签名称                                                 |
| Tips           | String   | 菜谱小贴士                                                   |
| like_num       | String   | 点赞数                                                       |

### 5.3 修改个人菜谱

**方式：**POST

**路由：**`/updateMenu`

**参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| username       | String   |                                                              |
| menu_id        | String   | 菜谱id                                                       |
| title          | String   | 菜谱标题                                                     |
| menu_pic       | String   | 菜谱封面图片                                                 |
| synopsis       | String   | 菜谱简介                                                     |
| material       | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name       | String   | 菜谱材料名称                                                 |
| mat_weight     | String   | 菜谱材料重量                                                 |
| practice       | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step           | Number   | 菜谱步骤序号                                                 |
| step_info      | String   | 菜谱步骤简介                                                 |
| step_pic       | String   | 菜谱步骤对应图片                                             |
| classification | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id  | String   | 菜谱标签id                                                   |
| classify_name  | String   | 菜谱标签名称                                                 |
| Tips           | String   | 菜谱小贴士                                                   |
| like_num       | String   | 点赞数                                                       |

**返回参数：**

| 参数名         | 参数类型 | 备注                                                         |
| -------------- | -------- | ------------------------------------------------------------ |
| username       | String   |                                                              |
| menu_id        | String   | 菜谱id                                                       |
| title          | String   | 菜谱标题                                                     |
| menu_pic       | String   | 菜谱封面图片                                                 |
| synopsis       | String   | 菜谱简介                                                     |
| material       | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name       | String   | 菜谱材料名称                                                 |
| mat_weight     | String   | 菜谱材料重量                                                 |
| practice       | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step           | Number   | 菜谱步骤序号                                                 |
| step_info      | String   | 菜谱步骤简介                                                 |
| step_pic       | String   | 菜谱步骤对应图片                                             |
| classification | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id  | String   | 菜谱标签id                                                   |
| classify_name  | String   | 菜谱标签名称                                                 |
| Tips           | String   | 菜谱小贴士                                                   |
| like_num       | String   | 点赞数                                                       |

### 5.4 点赞他人菜谱

**方式：**POST

**路由：**`/like`

**参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |
| like_num | String   | 点赞数 |

**返回参数：**

| 参数名   | 参数类型 | 备注   |
| -------- | -------- | ------ |
| username | String   |        |
| menu_id  | String   | 菜谱id |
| like_num | String   | 点赞数 |



### 5.5 查看本道菜谱

**方式：**GET

**路由：**`/menu/:menu_id`

**参数：**

| 参数名  | 参数类型 | 备注   |
| ------- | -------- | ------ |
| menu_id | String   | 菜谱id |

**返回参数：**

| 参数名          | 参数类型 | 备注                                                         |
| --------------- | -------- | ------------------------------------------------------------ |
| username        | String   | 创建人账户                                                   |
| Avatar          | String   | 创建人头像                                                   |
| menu_id         | String   | 菜谱id                                                       |
| title           | String   | 菜谱标题                                                     |
| menu_pic        | String   | 菜谱封面图片                                                 |
| synopsis        | String   | 菜谱简介                                                     |
| material        | Array    | 菜谱材料，为数组，下面的mat_name和mat_weight为其数组元素的属性 |
| mat_name        | String   | 菜谱材料名称                                                 |
| mat_weight      | String   | 菜谱材料重量                                                 |
| practice        | Array    | 菜谱步骤，下面的step，step_info和step_pic为其数组元素的属性  |
| step            | Number   | 菜谱步骤序号                                                 |
| step_info       | String   | 菜谱步骤简介                                                 |
| step_pic        | String   | 菜谱步骤对应图片                                             |
| classification  | Array    | 菜谱分类，下面的menu_label_id和classify_name为其数组元素的属性 |
| menu_label_id   | String   | 菜谱标签id                                                   |
| classify_name   | String   | 菜谱标签名称                                                 |
| Tips            | String   | 菜谱小贴士                                                   |
| like_num        | String   | 点赞数                                                       |
| comments        | Array    | 评论，数组内部的元素包含下列属性：username，Avatar和comment_content |
| username        | String   | 评论人账号                                                   |
| Avatar          | String   | 评论人头像                                                   |
| comment_content | String   | 评论内容                                                     |



### 5.6 查询头像

**方式：**GET

**路由：**`/avatar`

**参数：**

| 参数名  | 参数类型 | 备注   |
| ------- | -------- | ------ |
| menu_id | String   | 菜谱id |

**返回参数：**

| 参数名 | 参数类型 | 备注 |
| ------ | -------- | ---- |
| Avatar | String   |      |



### 5.7 搜索菜谱

**方式：**POST

**路由：**`/searchMenu`

**参数：**

| 参数名 | 参数类型 | 备注     |
| ------ | -------- | -------- |
| input  | String   | 搜索字段 |

**返回参数：**

| 参数名   | 参数类型 | 备注                                   |
| -------- | -------- | -------------------------------------- |
| menuList | Array    | 菜谱列表，以下参数为菜谱列表元素的属性 |
| menu_id  | String   | 菜谱id                                 |
| username | String   | 菜谱创建人                             |
| like_num | String   | 点赞数                                 |
| synopsis | String   | 简介                                   |



## 6 作品相关

### 6.1 添加个人作品

**方式：**POST

**路由：**`/addCookingWork`

**参数：**

| 参数名             | 参数类型 | 备注         |
| ------------------ | -------- | ------------ |
| username           | String   |              |
| cooking_works_pic  | String   | 作品图片     |
| experience         | String   | 作品文本内容 |
| like_num           | Number   | 作品点赞数   |
| cooking_works_time | String   | 作品创建时间 |

**返回参数：**

| 参数名             | 参数类型 | 备注         |
| ------------------ | -------- | ------------ |
| username           | String   |              |
| cooking_works_id   | String   | 作品id       |
| cooking_works_pic  | String   | 作品图片     |
| experience         | String   | 作品文本内容 |
| like_num           | Number   | 作品点赞数   |
| cooking_works_time | String   | 作品创建时间 |

### 6.2 删除个人作品

**方式：**POST

**路由：**`/deleteCookingWork`

**参数：**

| 参数名           | 参数类型 | 备注   |
| ---------------- | -------- | ------ |
| username         | String   |        |
| cooking_works_id | String   | 作品id |

**返回参数：**

| 参数名             | 参数类型 | 备注         |
| ------------------ | -------- | ------------ |
| username           | String   |              |
| cooking_works_id   | String   | 作品id       |
| cooking_works_pic  | String   | 作品图片     |
| experience         | String   | 作品文本内容 |
| like_num           | Number   | 作品点赞数   |
| cooking_works_time | String   | 作品创建时间 |



### 6.3 点赞他人作品

**方式：**

**路由：**

**参数：**

| 参数名            | 参数类型 | 备注       |
| ----------------- | -------- | ---------- |
| username          | String   |            |
| cooking_works_pic | String   | 作品图片   |
| like_num          | Number   | 作品点赞数 |

**返回参数：**

| 参数名            | 参数类型 | 备注       |
| ----------------- | -------- | ---------- |
| username          | String   |            |
| cooking_works_pic | String   | 作品图片   |
| like_num          | Number   | 作品点赞数 |



## 7 用户评价相关

### 7.1 添加个人评论

**方式：**POST

**路由：**`/addComment`

**参数：**

| 参数名   | 参数类型 | 备注             |
| -------- | -------- | ---------------- |
| username | String   |                  |
| Avatar   | String   | 用户头像         |
| menu_id  | String   | 用户所评价的菜谱 |
| comment  | String   | 用户的评价       |

**返回参数：**

| 参数名   | 参数类型 | 备注             |
| -------- | -------- | ---------------- |
| username | String   |                  |
| Avatar   | String   | 用户头像         |
| menu_id  | String   | 用户所评价的菜谱 |
| comment  | String   | 用户的评价       |



### 7.2 删除个人评论

**方式：**POST

**路由：**`/deleteComment`

**参数：**

| 参数名   | 参数类型 | 备注             |
| -------- | -------- | ---------------- |
| username | String   |                  |
| Avatar   | String   | 用户头像         |
| menu_id  | String   | 用户所评价的菜谱 |
| comment  | String   | 用户的评价       |

**返回参数：**

| 参数名   | 参数类型 | 备注             |
| -------- | -------- | ---------------- |
| username | String   |                  |
| Avatar   | String   | 用户头像         |
| menu_id  | String   | 用户所评价的菜谱 |
| comment  | String   | 用户的评价       |



### 7.3 查看菜谱评论

**方式：**GET

**路由：**`/commentList`

**参数：**

| 参数名  | 参数类型 | 备注 |
| ------- | -------- | ---- |
| menu_id | String   |      |

**返回参数：**

| 参数名          | 参数类型 | 备注                                           |
| --------------- | -------- | ---------------------------------------------- |
| menu_id         | String   |                                                |
| comments        | Array    | 评论数组，下面的属性皆为comments内部元素的属性 |
| username        | String   | 评论的用户                                     |
| Avatar          | String   | 评论用户的头像                                 |
| comment_content | String   | 评论用户的内容                                 |



## 8 菜谱展示相关

### 8.1 菜谱首页展示

**方式：**GET

**路由：**`/menuList`

**参数：**

| 参数名 | 参数类型 | 备注 |
| ------ | -------- | ---- |
| none   |          |      |

**返回参数：**

| 参数名   | 参数类型 | 备注                                   |
| -------- | -------- | -------------------------------------- |
| menuList | Array    | 菜谱列表，以下参数为菜谱列表元素的属性 |
| menu_id  | String   | 菜谱id                                 |
| username | String   | 菜谱创建人                             |
| like_num | String   | 点赞数                                 |
| synopsis | String   | 简介                                   |



### 8.2 菜谱标签分类展示

**方式：**GET

**路由：**`/menuTagList`

**参数：**

| 参数名        | 参数类型 | 备注         |
| ------------- | -------- | ------------ |
| classify_name | String   | 标签分类类型 |

**返回参数：**

| 参数名   | 参数类型 | 备注                                   |
| -------- | -------- | -------------------------------------- |
| menuList | Array    | 菜谱列表，以下参数为菜谱列表元素的属性 |
| menu_id  | String   | 菜谱id                                 |
| username | String   | 菜谱创建人                             |
| like_num | String   | 点赞数                                 |
| synopsis | String   | 简介                                   |



## 9 作品展示相关



## 10 标签相关

### 10.1 标签列表展示

**方式：**GET

**路由：**`/tagList`

**参数：**

| 参数名 | 参数类型 | 备注 |
| ------ | -------- | ---- |
| none   |          |      |

**返回参数：**	

| 参数名        | 参数类型 | 备注                             |
| ------------- | -------- | -------------------------------- |
| tagList       | Array    | 标签列表，以下参数为列表元素属性 |
| menu_label_id | String   | 标签id                           |
| classify_name | String   | 分类名称                         |



## 11 图片上传相关

### 11.1 上传图片

**方式：**POST 【图片只能使用POST】

**路由：**`/upload`

**参数：**

| 参数名 | 参数类型 | 备注 |
| ------ | -------- | ---- |
| file   | png/jpeg | 图片 |

**返回参数：**

| 参数名 | 参数类型 | 备注             |
| ------ | -------- | ---------------- |
| url    | String   | 该图片的网络链接 |

