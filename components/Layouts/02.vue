<script setup>
const prop = defineProps(["data"]);
</script>

<template>
  <table
    cellpadding="0"
    style="
      vertical-align: -webkit-baseline-middle;
      /* font-size: medium; */
      font-family: Arial;
      width: 100%;
    "
    :style="{ color: data.design.layout.textColor, 'font-size': data.design.layout.fontSize + 'px', }"
  >
    <tr>
      <table cellpadding="0" style="border-collapse: collapse">
        <tr valign="top">
          <td>
            <img
              :src="data.image.imgSrc || '/images/placeholder-small.jpg'"
              alt=""
              style="display: inline-block"
              :style="{ width: data.design.image.width + 'px' }"
            />
          </td>
          <td style="padding-left: 16px" valign="top">
            <table cellpadding="0" style="border-collapse: collapse">
              <tr>
                <td style="padding-bottom: 4px">
                  <h3>{{ data.name || "Full Name" }}</h3>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 4px">
                  <p>{{ data.position || "Position" }}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom: 4px">
                  <p>
                    <span>{{ data.department || "Department" }}</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span>{{ data.company || "Company" }}</span>
                  </p>
                </td>
              </tr>
              <tr
                height="25"
                style="vertical-align: middle"
                v-for="data in data.contactInfo"
                :key="data.id"
              >
                <td>
                  <span>{{ data.field}}: {{ data.value }}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span
                    v-for="social in data.socialInfo"
                    :key="social.id"
                    style="
                      padding-right: 4px;
                      padding-bottom: 4px;
                      display: inline-block;
                    "
                  >
                    <a :href="social.url" target="_blank">
                      <SocialIcon :icon="social.name" />
                    </a>
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </tr>
    <tr v-if="data.addons.videoMeeting.isAdded">
      <td
        style="margin: 0.1px; width: 100%"
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
            style="margin: 0.1px"
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
                  :height="42"
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
  </table>
</template>
