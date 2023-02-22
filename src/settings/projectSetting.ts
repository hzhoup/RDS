import type { ProjectConfig } from '/#/config'
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum'
import { CacheTypeEnum } from '/@/enums/cacheEnum'
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum
} from '/@/enums/appEnum'
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting'
import { primaryColor } from '../../build/config/themeConfig'

const setting: ProjectConfig = {
  showSettingButton: false,

  showDarkModeToggle: true,

  settingButtonPosition: SettingButtonPositionEnum.AUTO,

  permissionMode: PermissionModeEnum.ROUTE_MAPPING,

  permissionCacheType: CacheTypeEnum.LOCAL,

  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,

  themeColor: primaryColor,

  grayMode: false,

  colorWeak: false,

  fullContent: false,

  contentMode: ContentEnum.FULL,

  showLogo: true,

  showFooter: false,

  headerSetting: {
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    fixed: true,
    show: true,
    theme: ThemeEnum.LIGHT,
    showFullScreen: true,
    showDoc: true,
    showNotice: true,
    showSearch: true
  },

  menuSetting: {
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    fixed: true,
    collapsed: false,
    siderHidden: false,
    collapsedShowTitle: false,
    canDrag: true,
    show: true,
    hidden: false,
    menuWidth: 240,
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
    theme: ThemeEnum.DARK,
    split: false,
    topMenuAlign: 'center',
    trigger: TriggerEnum.HEADER,
    accordion: true,
    closeMixSidebarOnChange: false,
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    mixSideFixed: false
  },

  // Multi-label
  multiTabsSetting: {
    cache: false,
    show: true,
    canDrag: true,
    showQuick: true,
    showRedo: true,
    showFold: true
  },

  transitionSetting: {
    enable: true,

    basicTransition: RouterTransitionEnum.FADE_SIDE,

    openPageLoading: true,

    openNProgress: false
  },

  openKeepAlive: false,

  showBreadCrumb: true,

  showBreadCrumbIcon: false,

  useErrorHandle: false,

  useOpenBackTop: true,

  canEmbedIFramePage: true,

  closeMessageOnSwitch: true,

  removeAllHttpPending: false
}

export default setting
