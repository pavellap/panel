import {groupRules} from "../../template";

export const transformDataForSave = data => {
    console.log("Got data:", data)
    const added_rights = [];
    const deleted_rights = [];
    const users = [];
    Object.entries(data.rights).forEach(([key, value]) => {
        if (value[1] && value[2] === 'add')
            added_rights.push(Number(key));
        else if(value[1] && value[2] === 'remove')
            deleted_rights.push(Number(key));
    })
    data.clients.forEach((item, index) => {
        if (item.selected)
            users.push(item.id);
    })

    return {
        added_rights,
        deleted_rights,
        name: data.groupName,
        users
    }
}

export const transformRights = (added, deleted) => {
    added.forEach(item => {
        groupRules[item][1] = true
        groupRules[item][2] = 'add'
    });
    deleted.forEach(item => {
        groupRules[item][1] = true;
        groupRules[item][2] = 'remove'
    })
    return groupRules
}