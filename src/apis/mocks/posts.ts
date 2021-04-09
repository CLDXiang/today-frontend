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
    id: 23,
    content: '水水水水水水水水水水水水水水水水水水水水水',
    replyCount: 3,
    createdAt: dayjs('20210408123450'),
    creator: {
      id: '23',
      nickname: '黄叶子',
      avatar: 'https://picsum.photos/seed/hyz/40/40',
    },
  },
  {
    id: 1,
    content: '毕业论文问卷求填！！大概需要3分钟！！谢谢大家！！🥺🥺🥺\n\n链接放回复里',
    replyCount: 3,
    createdAt: dayjs('20210409211900'),
    creator: {
      id: '1',
      nickname: '胡而易',
      avatar: 'https://picsum.photos/seed/hey/40/40',
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
      avatar: 'https://picsum.photos/seed/fk/40/40',
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
      avatar: 'https://picsum.photos/seed/qq/40/40',
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
      avatar: 'https://picsum.photos/seed/czz/40/40',
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
      avatar: 'https://picsum.photos/seed/wxd/40/40',
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
      avatar: 'https://picsum.photos/seed/zjq/40/40',
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
      avatar: 'https://picsum.photos/seed/whq/40/40',
    },
  },
];

/** 求职攻略 */
export const mockPostsWork: Post[] = [
  {
    id: 1,
    content: '讲的简单粗暴点：一份高质量的实习offer，对于你的成长速度，可能比你待在学校前几年成长速度的总和都要快的多！一份高质量的实习经历，对于一个普通的本科生来说，是你能够和同年龄985同学乃至硕士同台竞争的。\n\n但大多数同学对于实习的认知，就是学校给分配，然后自己作为一个学生去简单“历练”“历练”，体验下工作生活就完事了~\n\n通常会养成这个观点，是因为学校老师、前几届的学长学姐等等给（xian）予（zhi）了我们的认知~',
    title: '从来没有实习经历的大学生如何找实习？【转载】',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20210409132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://picsum.photos/seed/qgg/40/40',
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
      avatar: 'https://picsum.photos/seed/zcl/40/40',
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
      avatar: 'https://picsum.photos/seed/xm/40/40',
    },
  },
];
