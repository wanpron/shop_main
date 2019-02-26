// 引入axios
/* eslint-disable-next-line */
// import axios from 'axios'

export default {
  data () {
    return {
      userList: [
        {
          username: '王小虎',
          email: 'tige112@163.com',
          mobile: '18616358651'
        }
      ],
      // 总条数
      total: 0,
      // 当前页
      pagenum: 1,
      // 查询数据
      input5: '',
      dialogFormVisible: true,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            pattern: /^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/,
            message: '手机格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    // this.loadUsersList(this.pagenum)
    this.loadUsersList()
  },
  methods: {
    // 获取用户 列表数据
    async loadUsersList (pagenum = 1, query = '') {
      let options = {
        params: {
          query,
          pagenum,
          pagesize: 2
        }
      }
      let res = await this.$axios.get('users', options)
      // 用户列表
      this.userList = res.data.data.users
      // 总页数
      this.total = res.data.data.total
      // 当前页
      this.pagenum = res.data.data.pagenum
      // axios
      //   .get('http://localhost:8888/api/private/v1/users', {
      //     params: {
      //       query,
      //       pagenum,
      //       pagesize: 2
      //     },
      //     headers: {
      //       Authorization: localStorage.getItem('token')
      //     }
      //   })
      //   .then(res => {
      //     console.log(res)
      //     // 用户列表
      //     this.userList = res.data.data.users
      //     // 总页数
      //     this.total = res.data.data.total
      //     // 当前页
      //     this.pagenum = res.data.data.pagenum
      //   })
    },
    // 点击页数
    pageChanged (curpage) {
      console.log(curpage)
      this.loadUsersList(curpage, this.input5)
    },
    // 查询
    startQuery () {
      // console.log('开始查询', this.input5)
      this.loadUsersList(1, this.input5)
    },
    // 删除用户
    async delUser (id) {
      // console.log('点击了', id)
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$axios.delete('users/' + id)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
        this.loadUsersList(1, '')
      } catch (error) {}
      // console.log('点击了取消')
      // this.$message({
      //   type: 'info',
      //   message: '已取消删除'
      // })
      this.$message.error('已取消删除')
    },
    // 修改状态
    async stateChange (row) {
      console.log(row)
      const id = row.id
      const mgState = row.mg_state
      let res = await this.$axios.put(`users/${id}/state/${mgState}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          message: res.data.meta.msg,
          type: 'success'
        })
      }
    }
  }
}
