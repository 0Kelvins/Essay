<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<table>
    <thead>
    <tr>
        <th class="setting-head"></th>
        <th></th>
    </tr>
    </thead>
    <tbody class="information">
    <tr>
        <td class="setting-title">
            原密码
        </td>
        <td><input id="oldPassword" type="password" placeholder="请输入原密码"></td>
    </tr>
    <tr>
        <td class="setting-title">
            新密码
        </td>
        <td><input id="newPassword" type="password" placeholder="请输入新密码"></td>
    </tr>
    <tr>
        <td class="setting-title">
            确认新密码
        </td>
        <td><input id="newPasswords" type="password" placeholder="请确认新密码"></td>
    </tr>
    <tr>
        <td class="setting-title"></td>
        <td><span id="tip"></span></td>
    </tr>
    </tbody>
</table>
<input id="settingSave" class="btn btn-success setting-save" type="submit" value="保存">