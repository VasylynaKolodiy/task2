import React from 'react';
import {ICell} from "../../models/Interfaces";

interface TableHeaderProps {
    cells: ICell[]
}

const TableHeader: React.FC<TableHeaderProps> = ({cells}) => {
    return (
        <thead>
        <tr className="notes__row">
            {cells.map(cell =>
                <th key={cell.attr}>{cell.node ? cell.node.head : cell.title}</th>
            )}
        </tr>
        </thead>
    );
};

export default TableHeader;