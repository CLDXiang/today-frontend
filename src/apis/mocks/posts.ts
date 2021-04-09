import { Post } from '@/views/Forum/types';
import dayjs from 'dayjs';

/** 树洞 */
export const mockPostsSecret: Post[] = [];

/** 闲聊 */
export const mockPostsChat: Post[] = [];

/** 求职攻略 */
export const mockPostsWork: Post[] = [
  {
    id: 1,
    content: `作者：微葭
    链接：https://www.zhihu.com/question/339170325/answer/1019957381
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
    先说说当时对候选人简历的评估标准：1、硬指标是实习时长，至少要在4个月以上且能马上到岗，这就意味着某些可能具有不稳定因素的候选人会被首先排除在外，比如大四和研三，同时面临着毕业实习+找工作，请假会很多+找到工作随时可能会走（大四已保研除外），有些耿直的同学会直接写只能工作三个月或者10月份就找寒假实习的，肯定直接pass；2、重点关注 学校（一本及以上）+专业相关+过往实习/社工经历，通常三者都命中会高优联系，命中两者也会视情况约来看看，每年的几个简历荒时期，有一项突出也会考虑通过简历关之后，一面环节大概会关注以下问题：1、岗位所在的垂直领域、互联网行业、头条以及对运营工作的理解，比如文化领域说不出三个领域内重点名人、近期热点事件，对于头条的理解停留在门户的编辑选稿，认为运营的工作是写稿的，基本上就代表凉凉了，不说经验问题，至少代表对岗位缺乏准备2、过往实习经历的个人总结部分，会重点关注逻辑性和表达能力，理想状态是能准确说出过往经历的主要职责、个人成长和不足；遇到过优秀的同学甚至能将过往实习进行串联，从A中学到了XX知识发现XX短板，于是进入到B工作中进行学习，之后逐渐发现了自己的兴趣和天赋点，从而来面我们的岗位；这一环节的表现是很多同学评分的分水岭3、部分实习工作相关的硬软技能考察，这一点仅作为前两点的加分项来看待，我们的工作涉及到部分新媒体运营和数据统计等，就会考察作为新媒体小编要注意的内容雷区（涉政、历史敏感时期等）和EXCEL常用的功能等4、对工作的期待，比如想做什么类型的工作、获得什么样的提升；这其实涉及到双向选择，如果候选人是想提升自己的新闻写作或者是产品能力，那就整体素质和技能再匹配，一般我们也会礼貌的拒绝（毕竟来了之后才发现工作跟自己想象的不一样挺痛苦的emm）这一点是最能展现候选人潜力的部分，高潜的候选人通常目标明确且跟我们的岗位完美契合`,
    title: '【转载】如何从零拿到第一份大厂实习？',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20200216132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://source.unsplash.com/random?q=qgg',
    },
  },
  {
    id: 2,
    content: '',
    title: '没有任何项目经历该如何写简历？大四计院学长一手攻略',
    replyCount: 32,
    thumbUpCount: 144,
    createdAt: dayjs('20200323085511'),
    creator: {
      id: '2',
      nickname: '张程亮',
      avatar: 'https://source.unsplash.com/random?q=zcl',
    },
  },
  {
    id: 1,
    content: `作者：微葭
    链接：https://www.zhihu.com/question/339170325/answer/1019957381
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
    先说说当时对候选人简历的评估标准：1、硬指标是实习时长，至少要在4个月以上且能马上到岗，这就意味着某些可能具有不稳定因素的候选人会被首先排除在外，比如大四和研三，同时面临着毕业实习+找工作，请假会很多+找到工作随时可能会走（大四已保研除外），有些耿直的同学会直接写只能工作三个月或者10月份就找寒假实习的，肯定直接pass；2、重点关注 学校（一本及以上）+专业相关+过往实习/社工经历，通常三者都命中会高优联系，命中两者也会视情况约来看看，每年的几个简历荒时期，有一项突出也会考虑通过简历关之后，一面环节大概会关注以下问题：1、岗位所在的垂直领域、互联网行业、头条以及对运营工作的理解，比如文化领域说不出三个领域内重点名人、近期热点事件，对于头条的理解停留在门户的编辑选稿，认为运营的工作是写稿的，基本上就代表凉凉了，不说经验问题，至少代表对岗位缺乏准备2、过往实习经历的个人总结部分，会重点关注逻辑性和表达能力，理想状态是能准确说出过往经历的主要职责、个人成长和不足；遇到过优秀的同学甚至能将过往实习进行串联，从A中学到了XX知识发现XX短板，于是进入到B工作中进行学习，之后逐渐发现了自己的兴趣和天赋点，从而来面我们的岗位；这一环节的表现是很多同学评分的分水岭3、部分实习工作相关的硬软技能考察，这一点仅作为前两点的加分项来看待，我们的工作涉及到部分新媒体运营和数据统计等，就会考察作为新媒体小编要注意的内容雷区（涉政、历史敏感时期等）和EXCEL常用的功能等4、对工作的期待，比如想做什么类型的工作、获得什么样的提升；这其实涉及到双向选择，如果候选人是想提升自己的新闻写作或者是产品能力，那就整体素质和技能再匹配，一般我们也会礼貌的拒绝（毕竟来了之后才发现工作跟自己想象的不一样挺痛苦的emm）这一点是最能展现候选人潜力的部分，高潜的候选人通常目标明确且跟我们的岗位完美契合`,
    title: '【转载】如何从零拿到第一份大厂实习？',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20200216132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://source.unsplash.com/random?q=qgg',
    },
  },
  {
    id: 2,
    content: '',
    title: '没有任何项目经历该如何写简历？大四计院学长一手攻略',
    replyCount: 32,
    thumbUpCount: 144,
    createdAt: dayjs('20200323085511'),
    creator: {
      id: '2',
      nickname: '张程亮',
      avatar: 'https://source.unsplash.com/random?q=zcl',
    },
  },
  {
    id: 1,
    content: `作者：微葭
    链接：https://www.zhihu.com/question/339170325/answer/1019957381
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
    先说说当时对候选人简历的评估标准：1、硬指标是实习时长，至少要在4个月以上且能马上到岗，这就意味着某些可能具有不稳定因素的候选人会被首先排除在外，比如大四和研三，同时面临着毕业实习+找工作，请假会很多+找到工作随时可能会走（大四已保研除外），有些耿直的同学会直接写只能工作三个月或者10月份就找寒假实习的，肯定直接pass；2、重点关注 学校（一本及以上）+专业相关+过往实习/社工经历，通常三者都命中会高优联系，命中两者也会视情况约来看看，每年的几个简历荒时期，有一项突出也会考虑通过简历关之后，一面环节大概会关注以下问题：1、岗位所在的垂直领域、互联网行业、头条以及对运营工作的理解，比如文化领域说不出三个领域内重点名人、近期热点事件，对于头条的理解停留在门户的编辑选稿，认为运营的工作是写稿的，基本上就代表凉凉了，不说经验问题，至少代表对岗位缺乏准备2、过往实习经历的个人总结部分，会重点关注逻辑性和表达能力，理想状态是能准确说出过往经历的主要职责、个人成长和不足；遇到过优秀的同学甚至能将过往实习进行串联，从A中学到了XX知识发现XX短板，于是进入到B工作中进行学习，之后逐渐发现了自己的兴趣和天赋点，从而来面我们的岗位；这一环节的表现是很多同学评分的分水岭3、部分实习工作相关的硬软技能考察，这一点仅作为前两点的加分项来看待，我们的工作涉及到部分新媒体运营和数据统计等，就会考察作为新媒体小编要注意的内容雷区（涉政、历史敏感时期等）和EXCEL常用的功能等4、对工作的期待，比如想做什么类型的工作、获得什么样的提升；这其实涉及到双向选择，如果候选人是想提升自己的新闻写作或者是产品能力，那就整体素质和技能再匹配，一般我们也会礼貌的拒绝（毕竟来了之后才发现工作跟自己想象的不一样挺痛苦的emm）这一点是最能展现候选人潜力的部分，高潜的候选人通常目标明确且跟我们的岗位完美契合`,
    title: '【转载】如何从零拿到第一份大厂实习？',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20200216132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://source.unsplash.com/random?q=qgg',
    },
  },
  {
    id: 2,
    content: '',
    title: '没有任何项目经历该如何写简历？大四计院学长一手攻略',
    replyCount: 32,
    thumbUpCount: 144,
    createdAt: dayjs('20200323085511'),
    creator: {
      id: '2',
      nickname: '张程亮',
      avatar: 'https://source.unsplash.com/random?q=zcl',
    },
  },
  {
    id: 1,
    content: `作者：微葭
    链接：https://www.zhihu.com/question/339170325/answer/1019957381
    来源：知乎
    著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
    
    先说说当时对候选人简历的评估标准：1、硬指标是实习时长，至少要在4个月以上且能马上到岗，这就意味着某些可能具有不稳定因素的候选人会被首先排除在外，比如大四和研三，同时面临着毕业实习+找工作，请假会很多+找到工作随时可能会走（大四已保研除外），有些耿直的同学会直接写只能工作三个月或者10月份就找寒假实习的，肯定直接pass；2、重点关注 学校（一本及以上）+专业相关+过往实习/社工经历，通常三者都命中会高优联系，命中两者也会视情况约来看看，每年的几个简历荒时期，有一项突出也会考虑通过简历关之后，一面环节大概会关注以下问题：1、岗位所在的垂直领域、互联网行业、头条以及对运营工作的理解，比如文化领域说不出三个领域内重点名人、近期热点事件，对于头条的理解停留在门户的编辑选稿，认为运营的工作是写稿的，基本上就代表凉凉了，不说经验问题，至少代表对岗位缺乏准备2、过往实习经历的个人总结部分，会重点关注逻辑性和表达能力，理想状态是能准确说出过往经历的主要职责、个人成长和不足；遇到过优秀的同学甚至能将过往实习进行串联，从A中学到了XX知识发现XX短板，于是进入到B工作中进行学习，之后逐渐发现了自己的兴趣和天赋点，从而来面我们的岗位；这一环节的表现是很多同学评分的分水岭3、部分实习工作相关的硬软技能考察，这一点仅作为前两点的加分项来看待，我们的工作涉及到部分新媒体运营和数据统计等，就会考察作为新媒体小编要注意的内容雷区（涉政、历史敏感时期等）和EXCEL常用的功能等4、对工作的期待，比如想做什么类型的工作、获得什么样的提升；这其实涉及到双向选择，如果候选人是想提升自己的新闻写作或者是产品能力，那就整体素质和技能再匹配，一般我们也会礼貌的拒绝（毕竟来了之后才发现工作跟自己想象的不一样挺痛苦的emm）这一点是最能展现候选人潜力的部分，高潜的候选人通常目标明确且跟我们的岗位完美契合`,
    title: '【转载】如何从零拿到第一份大厂实习？',
    replyCount: 12,
    thumbUpCount: 51,
    createdAt: dayjs('20200216132256'),
    creator: {
      id: '1',
      nickname: '钱果果',
      avatar: 'https://source.unsplash.com/random?q=qgg',
    },
  },
  {
    id: 2,
    content: '',
    title: '没有任何项目经历该如何写简历？大四计院学长一手攻略',
    replyCount: 32,
    thumbUpCount: 144,
    createdAt: dayjs('20200323085511'),
    creator: {
      id: '2',
      nickname: '张程亮',
      avatar: 'https://source.unsplash.com/random?q=zcl',
    },
  },
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Channel1',
    content: '这是有史以来第一篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    replyCount: 13,
    thumbUpCount: 3,
    creator: {
      id: '234',
      nickname: '张陆洋',
      avatar: 'https://source.unsplash.com/random?q=zly',
    },
  },
  {
    id: 2,
    title: '第二篇帖子',
    content: '这是有史以来第二篇帖子',
    replyCount: 24,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '吴蚝田',
      avatar: 'https://source.unsplash.com/random?q=wht',
    },
  },
  {
    id: 3,
    title: '第三篇帖子',
    content: '这是有史以来第三篇帖子',
    replyCount: 1,
    thumbUpCount: 7,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: 'https://source.unsplash.com/random?q=zys',
    },
  },
  {
    id: 4,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 7,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 5,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 14,
    thumbUpCount: 6,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 6,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 10,
    thumbUpCount: 9,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 7,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 8,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 8,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 4,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 9,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 2,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 10,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 5,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
];

const mockPosts2: Post[] = [
  {
    id: 1,
    title: 'Channel2',
    content: '这是有史以来第一篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    replyCount: 13,
    thumbUpCount: 3,
    creator: {
      id: '234',
      nickname: '张陆洋',
      avatar: 'https://source.unsplash.com/random?q=zly',
    },
  },
  {
    id: 2,
    title: '第二篇帖子',
    content: '这是有史以来第二篇帖子',
    replyCount: 24,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '吴蚝田',
      avatar: 'https://source.unsplash.com/random?q=wht',
    },
  },
  {
    id: 3,
    title: '第三篇帖子',
    content: '这是有史以来第三篇帖子',
    replyCount: 1,
    thumbUpCount: 7,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: 'https://source.unsplash.com/random?q=zys',
    },
  },
  {
    id: 4,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 7,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 5,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 14,
    thumbUpCount: 6,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 6,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 10,
    thumbUpCount: 9,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 7,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 8,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 8,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 4,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 9,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 2,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 10,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 5,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
];

const mockPosts3: Post[] = [
  {
    id: 1,
    title: 'Channel3',
    content: '这是有史以来第一篇帖子',
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    replyCount: 13,
    thumbUpCount: 3,
    creator: {
      id: '234',
      nickname: '张陆洋',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 2,
    title: '第二篇帖子',
    content: '这是有史以来第二篇帖子',
    replyCount: 24,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '吴蚝田',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 3,
    title: '第三篇帖子',
    content: '这是有史以来第三篇帖子',
    replyCount: 1,
    thumbUpCount: 7,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '张银时',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 4,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 7,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 5,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 14,
    thumbUpCount: 6,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 6,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 10,
    thumbUpCount: 9,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 7,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 8,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 8,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 0,
    thumbUpCount: 4,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 9,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 2,
    thumbUpCount: 5,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
  {
    id: 10,
    title: '第四篇帖子',
    content: '这是有史以来第四篇帖子',
    replyCount: 5,
    thumbUpCount: 1,
    createdAt: dayjs('Wed Oct 14 2020 00:09:33 GMT+0800 (中国标准时间)'),
    creator: {
      id: '234',
      nickname: '刘乐',
      avatar: 'https://source.unsplash.com/random?q=ll',
    },
  },
];
