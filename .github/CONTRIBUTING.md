# 协作流程

1. 提出事项（如有必要需要先在 slack 讨论）；
2. 在看板中新增一个前端事项，填写 `Tags`, `Creator`，在正文中尽量提供描述和辅助信息，可以写一些如“可能的解决方案”等的任何与该事项有关的信息；
3. 任何同学都可以接手未被指定 `Assignee` 的事项，将事项的 `Assignee` 指定为自己即可，如果对于完成时间有预期，可以填写 `计划完成时间` ；
4. 在准备开始工作时，将事项的 `Status` 改为 `In progress`，从仓库同步最新 master 分支（或其他分支，在有特殊需要时），新建一个分支来编写代码；
5. 工作进行过程中，可以将对应分支提前提 PR，将 PR 打上 `WIP` Label 并且不指定 reviewer 即可；
6. 完成工作后，正式提 PR，按照 PR 模板要求详细写明 PR 中涉及的工作，设置合适的 `Labels`，并且指定 reviewers。将看板中对应事项 `Status` 改为 `Reviewing`，并且填写对应 PR 链接。同时在 slack 附上 PR 链接 @ reviewers。
7. 被指定的 Reviewer 尽快回应（可以/不可以 review），并进行 review， review 完后在 slack 对应消息处回复一下 assignee review 结果；
8. 此后 Reviewer 和 Assignee 间如果需要相互通知该 PR 的工作进程，尽量在 slack 同步通知一下对方；
9. PR 被 Approve 并且 CI 通过后，由任何参与该 PR 工作流的同学合入 master 分支上线；
10. 将看板中 `Status` 改为 `Completed`。
