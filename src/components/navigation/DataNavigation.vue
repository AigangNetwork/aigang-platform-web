<template>
  <div class="dataset-navigation-container">
    <div class="dataset-navigation">
      <nav class="dataset-navigation-menu">

        <ul>
          <transition-group name="fade">
            <li v-if="show" v-for="bar in navigationBars" :key="bar.name">
              <router-link :to="bar.routeLink" active-class="dataset-bar-active" :class="{'disabled': bar.disabled}" exact>
                <img class="file-img" :src="bar.imgSrc" alt=""> {{ bar.name }}
              </router-link>
            </li>
            <slot></slot>
          </transition-group>
        </ul>

      </nav>
    </div>
  </div>

</template>

<script>
export default {
  props: ['navigationBars', 'show']
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .file-img {
    margin-right: 8px;
    margin-left: 4px;
  }

  .disabled {
    pointer-events: none;
  }

  .dataset-bar-active {
    border-bottom: solid 2px;
    border-bottom-color: $orange;
    opacity: 1;
  }

  .dataset-navigation-container {
    width: 100%;
    max-width: 932px;

    z-index: 1;
    .dataset-navigation {
      background-color: white;
    }
  }

  .dataset-navigation-menu {
    width: 100%;
    color: black;
    background: white;
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 1;
    ul {
      list-style-type: none;
      display: flex;
      width: 100%;
      margin: 16px 53px 16px 53px;
      padding-left: 0;
      li {
        justify-content: center;
        max-height: 48px;
        h3 {
          height: 44px;
          line-height: 44px;
          margin: 2px;
        }
        &+li {
          margin-left: 25px;
        }
        &:last-child {
          flex-grow: 1;
          text-align: right;
        }
        a {
          padding: 15px 10px 5px 5px;
          font-family: $font-secondary;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          &:hover {
            color: rgba(black, .65);
          }
        }
      }

      span {
        list-style-type: none;
        display: flex;
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .dataset-navigation-container {
      .dataset-navigation-menu {
        ul {
          padding-left: 0;
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 765px) {
    .dataset-navigation-container {
      .dataset-navigation-menu {
        padding-bottom: 10px;

        ul span {
          padding-left: 0;
          flex-direction: row;
          flex-wrap: wrap;
          flex-flow: row wrap;
          justify-content: space-between;
          li {
            margin-left: 0;
            width: 50%;
            min-width: 155px;
            flex-grow: 1;

            h3 {
              text-align: center;
              line-height: 24px;
              height: 24px;
              margin-top: 12px;
            }

            a {
              width: 155px;
              margin: 0 auto;
            }

          }
          li:last-child {
            flex-grow: 0;

            button {
              width: 100%;
              margin: 30px;
              display: block;
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 376px) {
    .dataset-navigation-container .dataset-navigation-menu ul span {
      justify-content: space-around;

      li {
        width: 100%;
      }
    }

  }
</style>
