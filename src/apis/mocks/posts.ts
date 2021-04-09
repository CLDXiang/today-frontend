import { Post } from '@/views/Forum/types';
import dayjs from 'dayjs';

/** 树洞 */
export const mockPostsSecret: Post[] = [
  {
    id: 1,
    content: '有同学认识数院的 wsx 同学吗？求联系方式',
    replyCount: 2,
    createdAt: dayjs('20210405231123'),
    creator: {
      id: '1',
      nickname: '匿名同学',
    },
  },
  {
    id: 2,
    content: '期中季压力真的好大，身边也没有可以随意倾诉的人，大家遇到压力大的时候都是怎么排解的呢？',
    replyCount: 33,
    createdAt: dayjs('20210406215021'),
    creator: {
      id: '2',
      nickname: '匿名同学',
    },
  },
  {
    id: 3,
    content: '为什么那么多年都没有出现能替代日月光华的复旦校内社区软件？',
    replyCount: 14,
    createdAt: dayjs('20210406225152'),
    creator: {
      id: '3',
      nickname: '匿名同学',
    },
  },
  {
    id: 4,
    content: '受不了了，提前一天占座是不是不太合适？甚至有人占座后又不来上课\n\n谁能管一管呀！！',
    replyCount: 32,
    createdAt: dayjs('20210406231223'),
    creator: {
      id: '4',
      nickname: '匿名同学',
    },
  },
  {
    id: 5,
    content: '最近和室友一起试了试在寝室自习，在商量好学习和休息时间的前提下其实还蛮舒服的\n\n我们寝室现在的时间表是：\n\n- 7:00am 起床洗漱\n\n 7:30am 一起去吃早饭\n\n',
    replyCount: 28,
    createdAt: dayjs('20210408201212'),
    creator: {
      id: '5',
      nickname: '匿名同学',
    },
  },
];

/** 闲聊 */
export const mockPostsChat: Post[] = [
  {
    id: 1,
    content: '毕业论文问卷求填！！大概需要3分钟！！谢谢大家！！🥺🥺🥺\n\n链接放回复里',
    replyCount: 3,
    createdAt: dayjs('20210409211900'),
    creator: {
      id: '1',
      nickname: '胡而易',
      avatar: 'https://source.unsplash.com/random?q=hey',
    },
  },
  {
    id: 2,
    content: '收一本《微观经济学：现代观点》第九版',
    replyCount: 1,
    createdAt: dayjs('20210409174211'),
    creator: {
      id: '2',
      nickname: '方库',
      avatar: 'https://source.unsplash.com/random?q=fk',
    },
  },
  {
    id: 3,
    content: '求问有无男士西装定制或半定制店推荐，萌新瑟瑟发抖🥶',
    replyCount: 2,
    createdAt: dayjs('20210409131422'),
    creator: {
      id: '3',
      nickname: '秦清',
      avatar: 'https://source.unsplash.com/random?q=qq',
    },
  },
  {
    id: 4,
    content: '有同学知道今天的校车班次吗？',
    replyCount: 4,
    createdAt: dayjs('20210409092211'),
    creator: {
      id: '4',
      nickname: '陈真真',
      avatar: 'https://source.unsplash.com/random?q=czz',
    },
  },
  {
    id: 5,
    content: '今天三教通宵教室是开的吗？？',
    replyCount: 4,
    createdAt: dayjs('20210409212201'),
    creator: {
      id: '4',
      nickname: '吴限达',
      avatar: 'https://source.unsplash.com/random?q=wxd',
    },
  },
  {
    id: 6,
    content: '哈哈，三教的猫猫今天又入侵教室了',
    replyCount: 4,
    createdAt: dayjs('20210409102001'),
    creator: {
      id: '4',
      nickname: '周见齐',
      avatar: 'https://source.unsplash.com/random?q=zjq',
    },
  },
  {
    id: 7,
    content: '有同学知道乐昕的毛概有课程群吗？如果有的话求拉一下，请奶茶🥤',
    replyCount: 4,
    createdAt: dayjs('20210409231122'),
    creator: {
      id: '4',
      nickname: '吴华群',
      avatar: 'https://source.unsplash.com/random?q=whq',
    },
  },
];

/** 求职攻略 */
export const mockPostsWork: Post[] = [
  {
    id: 1,
    content: `先说说当时对候选人简历的评估标准：
    1、硬指标是实习时长，至少要在4个月以上且能马上到岗，这就意味着某些可能具有不稳定因素的候选人会被首先排除在外，比如大四和研三，同时面临着毕业实习+找工作，请假会很多+找到工作随时可能会走（大四已保研除外），有些耿直的同学会直接写只能工作三个月或者10月份就找寒假实习的，肯定直接pass；2、重点关注 学校（一本及以上）+专业相关+过往实习/社工经历，通常三者都命中会高优联系，命中两者也会视情况约来看看，每年的几个简历荒时期，有一项突出也会考虑通过简历关之后，一面环节大概会关注以下问题：1、岗位所在的垂直领域、互联网行业、头条以及对运营工作的理解，比如文化领域说不出三个领域内重点名人、近期热点事件，对于头条的理解停留在门户的编辑选稿，认为运营的工作是写稿的，基本上就代表凉凉了，不说经验问题，至少代表对岗位缺乏准备2、过往实习经历的个人总结部分，会重点关注逻辑性和表达能力，理想状态是能准确说出过往经历的主要职责、个人成长和不足；遇到过优秀的同学甚至能将过往实习进行串联，从A中学到了XX知识发现XX短板，于是进入到B工作中进行学习，之后逐渐发现了自己的兴趣和天赋点，从而来面我们的岗位；这一环节的表现是很多同学评分的分水岭3、部分实习工作相关的硬软技能考察，这一点仅作为前两点的加分项来看待，我们的工作涉及到部分新媒体运营和数据统计等，就会考察作为新媒体小编要注意的内容雷区（涉政、历史敏感时期等）和EXCEL常用的功能等4、对工作的期待，比如想做什么类型的工作、获得什么样的提升；这其实涉及到双向选择，如果候选人是想提升自己的新闻写作或者是产品能力，那就整体素质和技能再匹配，一般我们也会礼貌的拒绝（毕竟来了之后才发现工作跟自己想象的不一样挺痛苦的emm）这一点是最能展现候选人潜力的部分，高潜的候选人通常目标明确且跟我们的岗位完美契合
    作者：微葭
    链接：https://www.zhihu.com/question/339170325/answer/1019957381
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`,
    title: '如何从零拿到第一份大厂实习？【转载】',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20210409132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://source.unsplash.com/random?q=qgg',
    },
  },
  {
    id: 2,
    content: '各位好呀，我是来自 17 计算机科学与技术专业的张程亮~ 😀\n\n我自大三下学期开始分别在腾讯、微软亚洲研究院实习，在前往腾讯实习前没有任何可以拿得出手的项目经历',
    title: '没有任何项目经历该如何写简历？大四计院学长一手攻略',
    replyCount: 32,
    thumbUpCount: 144,
    createdAt: dayjs('20210323085511'),
    creator: {
      id: '2',
      nickname: '张程亮',
      avatar: 'https://source.unsplash.com/random?q=zcl',
    },
  },
  {
    id: 3,
    content: '萌新报道！本人留学党，最近在纠结实习的必要性和岗位选择的问题，二楼细说',
    title: '关于实习岗位的选择',
    replyCount: 55,
    thumbUpCount: 14,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '3',
      nickname: '徐萌',
      avatar: 'https://source.unsplash.com/random?q=xm',
    },
  },
];
