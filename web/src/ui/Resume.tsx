import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS: { id: string; label: string; href: string }[] = []

// 履历数据(双语)。英文为译稿,可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2003 – 2006',
        place: 'Nanchang Institute of Technology',
        role: 'Mechanical & Electronic Engineering · Associate',
      },
      {
        period: '2013 – 2016',
        place: 'Nanjing University',
        role: 'Human Resource Management · Bachelor (985/211)',
      },
      {
        period: '2006 – 2010',
        place: 'Inventec / Inrevium Shanghai',
        role: 'Process Engineer / SMT Manager',
        points: [
          'Laptop testing & NPI introduction',
          'TWI training implementation',
        ],
      },
      {
        period: '2011 – 2017',
        place: 'Magna Electronics',
        role: 'Production Manager / Lean Manufacturing Manager',
        points: [
          'Lean production system development, WCM, 6 Sigma',
          '2014 GQS Global Audit 2nd place (3.2/5)',
          'Suzhou - Zhangjiagang',
        ],
      },
      {
        period: '2021 – 2025',
        place: 'Zongmu Technology',
        role: 'VP of Operations',
        points: [
          'Oct 2021: Huzhou factory launched domain controller & millimeter-wave radar production, 12,000 pcs/month for Seres',
          '2022: World\'s first 10s fully automated 1M camera assembly line launched',
          'Q1 2023: 2nd 2-3M camera line mass production, Li Auto L789 & Voyah Dreamer delivery',
          'Jun 2023: Xiamen 10,000m² factory launched, ultrasonic/millimeter-wave radar lines transferred',
          'H2 2024: Domain controller fully automated line launched, Changan C2L platform delivery',
          'Self-developed test/calibration/parameter software, 20+ projects, saved 3M+ RMB in fixed assets',
        ],
      },
      {
        period: '2025 – Now',
        place: 'NavInfo',
        role: 'GM of Intelligent Manufacturing',
        points: [
          'Full lifecycle management of autonomous driving intelligent manufacturing projects (from initiation to mass production)',
          'Established OEM KPI management system, lean production increased yield to 98%+',
          'Led new smart factory construction (50M+ RMB investment), 85% automation rate',
          'Built R&D-production-delivery quality control system (SPC included), PPM reduced to <200',
          'Restructured end-to-end smart logistics network (VMI/JIT), inventory turnover reduced 30%, transport cost down 18%',
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2003 – 2006',
        place: '南昌理工学院',
        role: '机械电子工程 · 大专',
      },
      {
        period: '2013 – 2016',
        place: '南京大学',
        role: '人力资源管理 · 本科（985/211）',
      },
      {
        period: '2006 – 2010',
        place: '上海英业达/英源达',
        role: '工艺工程师/SMT课长',
        points: [
          '笔记本电脑测试与NPI导入',
          'TWI企业内训',
        ],
      },
      {
        period: '2011 – 2017',
        place: '麦格纳电子',
        role: '生产部经理 / Lean Manufacturing Manager',
        points: [
          '负责精益生产体系建设、WCM、6 Sigma',
          '2014年GQS全球审核第二名（3.2分/5分）',
          '苏州-张家港',
        ],
      },
      {
        period: '2021 – 2025',
        place: '纵目科技',
        role: '运营副总裁',
        points: [
          '2021年10月完成湖州工厂域控制器和毫米波雷达投产，塞力斯12000pcs/月达产',
          '2022年全球第一条10s全自动化1M摄像头组装生产线投产',
          '2023Q1第二条2-3M摄像头组装线量产，理想L789、岚图梦想家达产交付',
          '2023年6月完成厦门工厂10000平方米投产，完成超声波/毫米波雷达生产线转移',
          '2024年下半年完成域控制器全自动化生产线量产，交付长安C2L平台车型',
          '自研测试/标定/内参软件，近20个项目，节约300万+固定资产',
        ],
      },
      {
        period: '2025 – 至今',
        place: '四维图新',
        role: '智能制造总经理',
        points: [
          '负责自动驾驶领域智能制造项目全生命周期导入（立项到量产）',
          '建立代工厂KPI管理体系，精益生产将良品率提升至98%以上',
          '主导新建智能工厂（总投资超5000万元），自动化率达85%',
          '构建研发-生产-交付全流程质量管控体系（含SPC），PPM降至200以下',
          '重构端到端智能物流网络（VMI/JIT），库存周转天数缩短30%，运输成本下降18%',
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点(相机停靠点),顺序须与 entries 一致。
// 名单是唯一真源,见 data/focusPoints.ts(Scene.tsx 也从那里取)。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容(点保持在外做时间轴标记):移动端可给它加卡片衬底,
          且它紧贴内容高度,不含 tl-entry 用于排布的大 padding。
          用普通 div(非 motion):framer 变体经 React context 穿透它,叶子元素仍是
          tl-entry 的直接 stagger 子级,入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
