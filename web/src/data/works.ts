// 作品集数据(双语)。5 大板块 → 点击展开作品详情。
// 纯数据驱动:增删板块 / 作品只改本文件,Works.jsx 仅负责渲染。
//
// 板块字段:
//   id        唯一标识(用于 framer layoutId 共享元素动画)
//   no        编号 '01'...'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表:{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情,可补充可选媒体/文案字段:
//             { image?, video?, year?, desc? }(缺省时媒体用占位、简介回退 meta/标签)
//   groups[]  分组作品(与 items 二选一):{ heading, items: string[] }
//   awards[]  奖项 chip(可选)
//   footer    底部技术/备注一行(可选)

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'production',
        no: '01',
        title: '智能产线',
        tagline: '自动化生产项目',
        items: [
          {
            name: '自动驾驶域控制器全自动化生产线',
            meta: '自动化率85%，良品率98%+',
            slug: 'domain-controller-line',
          },
          {
            name: '摄像头组装全自动化产线',
            meta: '全球首条10s摄像头组装线',
            tags: ['理想L789、岚图交付'],
            slug: 'camera-assembly-line',
          },
        ],
      },
      {
        id: 'factory',
        no: '02',
        title: '智能工厂',
        tagline: '工厂规划与建设',
        items: [
          {
            name: '智能工厂规划与落地',
            meta: '总投资5000万',
            tags: ['自动化率85%'],
            slug: 'smart-factory',
          },
        ],
      },
      {
        id: 'logistics',
        no: '03',
        title: '智能物流',
        tagline: '端到端物流网络',
        items: [
          {
            name: '端到端智能物流网络',
            meta: 'VMI/JIT',
            tags: ['库存周转天数缩短30%', '运输成本下降18%'],
            slug: 'smart-logistics',
          },
        ],
      },
      {
        id: 'training',
        no: '04',
        title: '培训经历',
        tagline: '专业资质与培训',
        items: [
          { name: 'TWI企业内训', meta: '2009' },
          { name: '6 Sigma', meta: '2009-2010' },
          { name: '麦格钠领导力发展计划', meta: '2011-2012' },
          { name: 'VDA6.3/Q1/QSB内审员培训', meta: '2013' },
          { name: 'GQS全球质量体系审核', meta: '2014' },
        ],
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'production',
        no: '01',
        title: 'Smart Production Lines',
        tagline: 'Automated Manufacturing Projects',
        items: [
          {
            name: 'Autonomous Driving Domain Controller Fully Automated Production Line',
            meta: '85% automation, 98%+ yield',
            slug: 'domain-controller-line',
          },
          {
            name: 'Camera Assembly Fully Automated Line',
            meta: 'World\'s first 10s camera assembly line',
            tags: ['Li Auto L789, Voyah delivery'],
            slug: 'camera-assembly-line',
          },
        ],
      },
      {
        id: 'factory',
        no: '02',
        title: 'Smart Factory',
        tagline: 'Factory Planning & Construction',
        items: [
          {
            name: 'Smart Factory Planning & Implementation',
            meta: '50M RMB investment',
            tags: ['85% automation rate'],
            slug: 'smart-factory',
          },
        ],
      },
      {
        id: 'logistics',
        no: '03',
        title: 'Smart Logistics',
        tagline: 'End-to-End Logistics Network',
        items: [
          {
            name: 'End-to-End Smart Logistics Network',
            meta: 'VMI/JIT',
            tags: ['Inventory turnover reduced 30%', 'Transport cost down 18%'],
            slug: 'smart-logistics',
          },
        ],
      },
      {
        id: 'training',
        no: '04',
        title: 'Training',
        tagline: 'Professional Certifications',
        items: [
          { name: 'TWI Corporate Training', meta: '2009' },
          { name: '6 Sigma', meta: '2009-2010' },
          { name: 'Magna Leadership Development Program', meta: '2011-2012' },
          { name: 'VDA6.3/Q1/QSB Internal Auditor Training', meta: '2013' },
          { name: 'GQS Global Quality System Audit', meta: '2014' },
        ],
      },
    ],
  },
}

// 板块配图(横向画廊每张卡片左侧的整高封面)。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位,放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  production: `${import.meta.env.BASE_URL}works/covers/ad.jpg`,
  factory: `${import.meta.env.BASE_URL}works/covers/maker.jpg`,
  logistics: `${import.meta.env.BASE_URL}works/covers/product.jpg`,
  training: `${import.meta.env.BASE_URL}works/covers/graphics.jpg`,
}

// 统计一个板块的作品数(items 或 groups 求和),用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
