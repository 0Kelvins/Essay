<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<table>
    <thead>
    <tr>
        <th class="setting-head responsive-head"></th>
        <th></th>
    </tr>
    </thead>
    <tbody class="base">
    <tr>
        <td class="top-line">
            <div class="avatar">
                <img id="userAvatar" src="${user.avatar}">
            </div>
        </td>
        <td class="top-line">
            <a class="btn btn-hollow">
                <input id="newAvatar" name="avatar" class="hide" type="file" unselectable="on">
                更改头像
            </a>
        </td>
    </tr>
    <tr>
        <td class="setting-title">
            昵称
        </td>
        <td><input id="username" type="text" placeholder="请输入昵称" value="${user.username}"></td>
    </tr>
    <tr>
        <td class="setting-title">
        </td>
        <td><span id="tip"></span></td>
    </tr>
    </tbody>
</table>
<input id="settingSave" class="btn btn-success setting-save" type="button" value="保存">
