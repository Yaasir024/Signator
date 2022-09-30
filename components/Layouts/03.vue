<script setup>
const prop = defineProps(["data"]);
</script>

<template>
  <table
    cellpadding="0"
    style="
      vertical-align: -webkit-baseline-middle;
      font-family: Arial;
      width: 500px;
    "
    :style="{
      color: data.design.layout.textColor,
      'font-size': data.design.layout.fontSize + 'px',
      'font-family': data.design.layout.fontFamily,
    }"
  >
    <tr>
      <td>
        <img
          :src="data.image.imgSrc "
          alt=""
          style="display: inline-block"
          :style="{
            width: data.design.image.width + 'px',
            borderRadius: data.design.image.roundness + '%',
          }"
        />
      </td>
    </tr>
    <tr>
      <td
        style="font-size: 125%; text-transform: uppercase"
        :style="{ color: data.design.layout.templateColor }"
      >
        {{ data.name }}
      </td>
    </tr>
    <tr v-if="data.position">
      <td>
        {{ data.position }}
      </td>
    </tr>
    <tr>
      <td>
        <p>
          <span v-if="data.department">{{ data.department }}</span>
          <span v-if="data.department && data.company">&nbsp;|&nbsp;</span>
          <span v-if="data.company">{{ data.company }}</span>
        </p>
      </td>
    </tr>
    <tr
      style="vertical-align: middle"
      v-for="data in data.contactInfo"
      :key="data.id"
    >
      <td>
        <span
          >{{ data.field }}<span v-if="data.field">:</span>
          {{ data.value }}</span
        >
      </td>
    </tr>
    <tr v-if="data.socialInfo">
      <td style="padding-top:5px;">
        <span
          v-for="social in data.socialInfo"
          :key="social.id"
          style="padding-right: 4px; padding-bottom: 4px; display: inline-block"
        >
          <a :href="social.url" target="_blank">
            <IconSocial :icon="social.name" :data="data.design.socialIcon" />
          </a>
        </span>
      </td>
    </tr>
    <tr v-if="data.addons.videoMeeting.isAdded">
      <td
        style="margin: 0.1px; width: 100%; font-size: 16px;"
        :style="{
          'padding-top': data.addons.videoMeeting.style.paddingTop + 'px',
        }"
      >
        <a :href="data.addons.videoMeeting.items.url" target="_blank">
          <IconVideoMeeting
            :type="data.addons.videoMeeting.items.name"
            :text="data.addons.videoMeeting.items.text"
          />
        </a>
      </td>
    </tr>
    <tr v-if="data.addons.social.isAdded">
      <table cellspacing="0" cellpadding="0" border-0>
        <tr>
          <td
            :style="{
              'padding-top': data.addons.social.style.paddingTop + 'px',
            }"
          >
            <span v-for="social in data.addons.social.items" :key="social.id">
              <a
                :href="social.url"
                target="_blank"
                style="
                  padding-right: 4px;
                  padding-bottom: 4px;
                  display: inline-block;
                "
              >
                <img
                  :src="'/icons/addons/' + social.name + '_1' + '.png'"
                  :alt="social.name"
                  :style="{
                    height: data.addons.social.style.height + 'px',
                  }"
                />
              </a>
            </span>
          </td>
        </tr>
      </table>
    </tr>
    <tr v-if="data.addons.cta.isAdded">
      <td
        style=" width: 100%; text-align: center;"
        :style="{
          'padding-top': data.addons.cta.style.paddingTop + 'px',
        }"
      >
        <a :href="data.addons.cta.item.url" target="_blank">
          <div
            style="
              display: inline-block;
              padding: 0px 8px;
              cursor: pointer;
              font-size: 18px;
              font-weight: bold;
              line-height: 36px;
              min-width: 100px;
            "
            :style="{background: data.addons.cta.style.buttonColor, color: data.addons.cta.style.textColor}"
          >
          {{data.addons.cta.item.text}}
        </div>
        </a>
      </td>
    </tr>
  </table>
</template>

<!-- || '/images/placeholder-small.jpg' -->