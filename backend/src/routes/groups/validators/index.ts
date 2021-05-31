// MARK: Types
import {NewGroup} from "../../../types";

export async function validateGroup(group: NewGroup) : Promise<Boolean> {
	return group.nome.length > 0 && group.nome.length <= 32;
};