<template>
  <div>
    <div class="action-box">
      <h1 class="title">
        Explore
      </h1>

      <div class="query-bar">
        <div class="query-container">
          <input id="search-input" v-model="searchInput" class="search-bar" placeholder="Search by name, teacher or code">
          <div class="category-bar">
            <label v-for="c in categories" :key="c.name" class="category-button">
              <input v-model="tabIndex" type="radio" :value="c.name">
              <span>{{ c.name }}</span>
            </label>
          </div>
        </div>
        <label for="search-input" class="search-icon"><i /></label>
      </div>
    </div>

    <div class="result-box">
      <v-card>
        <v-list>
          <v-list-group
            v-for="(teachers, course) in searchResult"
            :key="course"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="course" />
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="t in teachers"
              :key="t[0]"
              link
              :to="`/rate/${t[1]}/${t[2]}`" 
            >
              <v-list-item-content>
                <v-list-item-title v-text="t[0]" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import lectures from '../../assets/lectures.json';

export default {
  components: {},

  data() {
    return {
      tabIndex: '',
      searchInput: '',
      searchResult: {
        Mathematics: [
          ['TA', 'code a'],
          ['TB', 'code b'],
        ],
        'Computer Science': [
          ['TA', 'code a'],
          ['TB', 'code b'],
        ],
      },
      filterLookup: {},

      // Customize your search filter here
      searchFilter(tuples, searchInput) {
        const maxSearchResult = 23; // Tune this

        const s = this.searchInput.replace(/\s/g, '');
        if (s.length === 0) return [];

        return tuples
          .filter((data) => {
            return (
              data.name.includes(searchInput) ||
              data.code.includes(searchInput) ||
              data.taught_by.includes(searchInput)
            );
          })
          .slice(0, maxSearchResult);
      },

      // Customize your tab and filter here
      categories: [
        {
          name: '思政',
          filter(tuples) {
            return tuples.filter((data) => {
              return data.code.includes('PTSS110') || data.code.includes('STUO110');
            });
          },
        },
        {
          name: '英语',
          filter(tuples) {
            return tuples.filter((data) => {
              return data.code.includes('ENGL110');
            });
          },
        },
        {
          name: '体育',
          filter(tuples) {
            return tuples.filter((data) => {
              return data.code.includes('PEDU110');
            });
          },
        },
      ],
    };
  },

  watch: {
    tabIndex(newi) {
      this.updateSearchResult(this.filterLookup[newi]);
    },
    searchInput() {
      this.searchResult = { Loading: [] };
      this.dUpdateSearchResult((tuples) => {
        return this.searchFilter(tuples, this.searchInput);
      });
    },
  },
  created() {
    this.dUpdateSearchResult = debounce(this.updateSearchResult, 500);
    this.categories.forEach((c) => {
      this.filterLookup[c.name] = c.filter;
    });
  },

  methods: {
    updateSearchResult(filterFunction) {
      const result = filterFunction(lectures);

      // group by class name
      const c2t = {};
      result.forEach((data) => {
        if (!c2t[data.name]) c2t[data.name] = [];
        c2t[data.name].push([data.taught_by, data.code, data.lecture_index]);
      });
      this.searchResult = c2t;
      console.log(c2t);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/config.scss';

$background-color: transparent;
$spacing: 1.6em;

$icon-width: 1em+2 * $spacing;
$height: 1em + 2 * $spacing;

.action-box {
  background-color: white;
}

.title {
  color: rgba(0, 0, 0, $active-opacity);
  font-size: 2.7em !important;
  padding-top: 3em;
  margin: 0 1.4rem 0.8em 1.4rem;
}

.query-bar {
  background-color: $background-color;
  display: flex;
  height: $height;
  align-items: center;
  overflow: hidden;
}

.query-container {
  position: relative;
  width: calc(100% - #{$icon-width});
}

.category-bar {
  height: $height;
  white-space: nowrap;
  overflow-x: auto;
  @include no-scrollbar;
}

.category-button {
  height: $height;
  display: inline-flex;
  cursor: pointer;
  margin-left: $spacing;

  align-items: center;
  > input {
    display: none;
  }

  > span {
    opacity: 0.3;
  }
  > span,
  > span::before {
    transition: opacity 0.2s;
  }
  // dot indicator
  > input + span::before {
    opacity: 0;
    transform: scale(0);
  }
  > input:checked {
    + span {
      position: relative;
      opacity: $active-opacity;
      &::before {
        position: absolute;
        left: 0.15em;
        bottom: -0.8em;
        content: '';
        background: currentColor;
        height: 0.3em;
        width: 0.3em;
        transform: scale(1);
        border-radius: 50%;
        opacity: 1;
      }
    }
  }
}

.search-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  height: $height;
  padding-left: $spacing;

  opacity: 0;
  transform: translateX(30%);
  transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.6s,
    opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0.2s;

  // Category items
  & + .category-bar {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.1s ease 0.4s, transform 0.4s ease 0.2s;
  }

  &:focus {
    opacity: 1;
    transform: translateX(0);
    transition: transform 1s cubic-bezier(0.12, 0.87, 0.15, 1) 0.4s,
      opacity 0.4s cubic-bezier(0.67, 0, 0.33, 1) 0.4s;
    & + .category-bar {
      pointer-events: none;
      opacity: 0;
      transform: translateX(-20%);
      transition: opacity 0.2s cubic-bezier(0.2727, 0.0986, 0.8333, 1) 0.2s, transform 0.4s linear;
    }
  }
}
.search-icon {
  background-color: $background-color;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  > i {
    display: inline-block;
    width: $icon-width;
    height: 2.75em;
    background: center no-repeat
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 44'%3E%3Cpath d='M15.27 28.29l-4.06-4.06a6.113 6.113 0 0 0 1.35-3.83c0-3.39-2.76-6.15-6.15-6.15-3.39 0-6.15 2.76-6.15 6.15s2.76 6.15 6.15 6.15c1.43 0 2.75-.5 3.8-1.33l4.06 4.06 1-.99zM6.4 25.33a4.93 4.93 0 0 1-4.92-4.92c0-2.71 2.2-4.92 4.92-4.92s4.92 2.21 4.92 4.92c.01 2.71-2.2 4.92-4.92 4.92z' fill='%23333333'/%3E%3C/svg%3E");
  }
}

.result-box {
  border-top: 1px solid rgba(0, 0, 0, $divider-opacity);
  padding: 1rem;
}
</style>
