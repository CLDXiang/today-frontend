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
    content:
      '期中季压力真的好大，身边也没有可以随意倾诉的人，大家遇到压力大的时候都是怎么排解的呢？',
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
    content:
      '最近和室友一起试了试在寝室自习，在商量好学习和休息时间的前提下其实还蛮舒服的\n\n我们寝室现在的时间表是：\n\n- 7:00am 起床洗漱\n\n 7:30am 一起去吃早饭\n\n',
    replyCount: 28,
    createdAt: dayjs('20210408201212'),
    creator: {
      id: '5',
      nickname: '匿名同学',
    },
  },
  {
    id: 6,
    content:
      '4月10号，医学院康泉图书馆，2点多到3142座位的小哥哥  不知道能不能看见，请问可以认识一下吗？😂刚人有点多不好意思上前打招呼😂离开了3楼，还是有点想认识你呢',
    replyCount: 21,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '4',
      nickname: '匿名同学',
    },
  },
  {
    id: 7,
    content:
      'msh大学物理下周四下午上习题课的助教   呜呜呜太帅了太耐心了讲课真的风趣幽默真的真的好帅啊呜呜呜呜！！！！',
    replyCount: 1,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '5',
      nickname: '匿名同学',
    },
  },
  {
    id: 6,
    content: '很高兴认识您  我喜欢您们',
    replyCount: 1,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '6',
      nickname: '匿名同学',
    },
  },
  {
    id: 7,
    content:
      '马克思主义中国化上岸的学长学姐  我是一个准备考这个专业的学弟，能给一点经验吗，学弟真的很迷茫。同时我是一名退伍老兵 希望通过士兵计划考。可以指导一下吗。',
    replyCount: 1,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '7',
      nickname: '匿名同学',
    },
  },
  {
    id: 8,
    content: '找饭搭子！！！想吃的好多，但人少的时候每次都点不了多少，攒一个多人局儿！',
    replyCount: 7,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '8',
      nickname: '匿名同学',
    },
  },
  {
    id: 9,
    content:
      '表白外在魔鬼内心天使的潼姐～潼姐，你胡言乱语时，仿佛烈焰与黑夜交织组成的魅影，腹黑搞怪令人目眩，把人拖入迷邪的夜中去；而你认真起来的时候，仿佛一汪澄澈深谧的湖，仿佛月色下一片晶莹的初春的叶子，令人心动，给人欢喜，予人深刻的慰藉和安宁。谢谢你呀潼姐，你教会了我如何冲破迷惘的泥沼寻找那永不泯灭的精神，你告诉我要在浓稠的夜里寻找那颗闪亮的天狼星。遇见你之后，我的生命变得更加生动绚烂，也更加坚定向善。潼姐，我不会忘记你魔鬼又天使的言语。希望我们友谊如天狼星般永远闪烁，在无尽的夜里也能带来希望与爱意。潼姐，我好喜欢你呀～愿你永葆那份纯粹与热情',
    replyCount: 7,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '9',
      nickname: '匿名同学',
    },
  },
  {
    id: 10,
    content:
      '周五下午在老化楼附近把黑色鸭舌帽压的很低的女孩子，不知道是因为什么事情，好像在掉眼泪哦，尽管你哭的时候侧脸很好看，但是眼泪是珍珠，要开心啊！Image',
    replyCount: 7,
    createdAt: dayjs('20210324175223'),
    creator: {
      id: '10',
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
    content:
      '讲的简单粗暴点：一份高质量的实习offer，对于你的成长速度，可能比你待在学校前几年成长速度的总和都要快的多！一份高质量的实习经历，对于一个普通的本科生来说，是你能够和同年龄985同学乃至硕士同台竞争的。\n\n但大多数同学对于实习的认知，就是学校给分配，然后自己作为一个学生去简单“历练”“历练”，体验下工作生活就完事了~\n\n通常会养成这个观点，是因为学校老师、前几届的学长学姐等等给（xian）予（zhi）了我们的认知~',
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
    content:
      '各位好呀，我是来自 17 计算机科学与技术专业的张程亮~ 😀\n\n我自大三下学期开始分别在腾讯、微软亚洲研究院实习，在前往腾讯实习前没有任何可以拿得出手的项目经历',
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
  {
    id: 4,
    content:
      '2020年毕业后受疫情影响找全职一度被多个公司pause进度后来一直在做各种parttime和contract由于第二年optextension必须要e-verify的公司答主从2020年12月开始找full-time工作到3月底在拿到的3个offer里终于确定了最终去处这四个月走下来中间心态几度崩掉回顾过去几个月的历程从内心经历的煎熬和痛苦到现在暂时稍微舒缓了一口气希望把自己的心得写下来分享给还在找工作中煎熬的小伙伴',
    title: '毕业10个月后终于找到full-time的血泪求职路',
    replyCount: 5,
    thumbUpCount: 19,
    createdAt: dayjs('20210324175221'),
    creator: {
      id: '4',
      nickname: '陆迪',
      avatar: 'https://picsum.photos/seed/ld/40/40',
    },
  },
  {
    id: 5,
    content:
      '谢谢大家点进来看拿到了几个offer目前在VMwareeBayAmazon三选一做summerintern不知道是否有哪家能defer到其他季节如果有同学知道哪家可以defer还请您留个言谢谢！🙏总体考虑还是1转正2学东西个人感觉总的来说都没有某一家能秒掉其他两家所以很纠结VMware听起来更难进但是被分到的组是NSX下面给网络虚拟化产品做CICDpipeline的不devops不负责测试就是给vmware自己的虚拟化产品开发cicd或者给现有的cicd添砖加瓦的engineer组用python和pytest以及Jenkins外加一点点开源工具有一种太底层和互联网大厂流行技术/流行业务脱节的感觉？不知道我的感觉对不对pros:',
    title: '实习Offer求比较：VMwareeBayAmazon',
    replyCount: 23,
    thumbUpCount: 32,
    createdAt: dayjs('20210324175221'),
    creator: {
      id: '5',
      nickname: '梁哏',
      avatar: 'https://picsum.photos/seed/lg/40/40',
    },
  },
  {
    id: 6,
    content:
      '上次发表了一个暴力转行cs的帖子之后看到不少同学发来站内信问我猎头我想单独开一篇帖子讲一下我作为过来人的经历我跳槽两次都是通过猎头自己跟几个猎头打过交道所以有些信息我可以尽量拿出来跟大家分享先说结论：猎头可以给你带来工作机会和信息但是如果你能力够强你其实并不需要猎头首先说明我个人是在纽约地区找工作所以对于湾区的情况并没有亲身经历过另外有些东西我加入了自己的理解也许会有不对的地方请见谅',
    title: '关于通过猎头找工作',
    replyCount: 73,
    thumbUpCount: 12,
    createdAt: dayjs('20210324175212'),
    creator: {
      id: '6',
      nickname: '黄涂',
      avatar: 'https://picsum.photos/seed/ht/40/40',
    },
  },
];
