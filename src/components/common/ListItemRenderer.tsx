import { FilterOption } from '../../utils/interfaces';

interface Props {
  checked: boolean;
  option: FilterOption;
  disabled?: boolean;
  onClick: any;
}

const ListItemRenderer = ({ checked, option, onClick, disabled }: Props) => (
  <div className={`item-renderer ${disabled && 'disabled'}`}>
    <input
      type="checkbox"
      onChange={onClick}
      checked={checked}
      tabIndex={-1}
      disabled={disabled}
      // This is a hack to align the checkbox with the label
      style={{ position: 'relative', top: '1px' }}
    />
    <span>{option.label}</span>
  </div>
);

export default ListItemRenderer;
