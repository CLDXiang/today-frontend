<template>
  <v-container>
    <v-row justify="center">
      <v-col
        md="10"
        lg="8"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                用户资料
              </v-list-item-title>
              <v-list-item-subtitle>欢迎 {{ user }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-row
              dense
            >
              <template
                v-for="(item, index) in cols"
              >
                <v-col
                  :key="index"
                >
                  <v-list-item
                    two-line
                    :to="item.to"
                    class="px-1"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        align="center"
                        v-text="item.name"
                      />
                      <v-list-item-subtitle
                        align="center"
                        class="mt-2"
                        v-text="item.count"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-divider
                  v-if="index < cols.length - 1"
                  :key="index"
                  vertical
                />
              </template>
            </v-row>
          </v-list-item>
          <v-card-actions>
            <v-row
              justify="center"
            >
              <v-col
                md="4"
                lg="5"
              >
                <v-btn
                  color="primary"
                  large
                  block
                  @click="logout"
                >
                  退出登录
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cols: [
        {
          name: '关注课程',
          count: 0,
          to: { name: 'StarCourse' },
        },
        {
          name: '评论课程',
          count: 0,
          to: { name: 'StarCourse' },
        },
        {
          name: '粉丝',
          count: 0,
          to: { name: 'StarCourse' },
        },
        {
          name: '关注用户',
          count: 0,
          to: { name: 'StarCourse' },
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.user.name;
    },
  },
  methods: {
    logout() {
      this.$store.commit('SET_JWT_TOKEN', '');
    },
  },
};
</script>

<style></style>
