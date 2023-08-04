import React from 'react';
import {ICell, INote, ISummaryObj} from "../../models/Interfaces";
import "./TableBody.scss"
import {ReactComponent as IconHealth} from "../../assets/img/icon-health.svg";
import {ReactComponent as IconShopping} from "../../assets/img/icon-shopping.svg";
import {ReactComponent as IconTasks} from "../../assets/img/icon-tasks.svg";


interface TableBodyProps {
    data: INote[] | ISummaryObj[],
    cells: ICell[],
}

const TableBody: React.FC<TableBodyProps> = ({data, cells}) => {
    return (
        <tbody>
        {data.map((item: INote|ISummaryObj) =>
            <tr className={`notes__row ${item.archived ? 'archived' : ''}`} key={item.id}>
                {cells.map((cell: ICell) =>
                    <td key={cell.attr}>
                        {cell.attr === 'icon' && (
                            <div className='note__icon'>
                                {item.category === "Shopping"
                                    ? <IconShopping/>
                                    : item.category === "Tasks" ? <IconTasks/> : <IconHealth/>
                                }
                            </div>
                        )}
                        {cell.node ? cell.node.body(item) : item[cell.attr]}
                    </td>
                )}
            </tr>
        )}
        </tbody>
    );
};

export default TableBody;