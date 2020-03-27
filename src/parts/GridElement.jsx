import { Part } from '../Part';
import { jsx } from '../utils/jsx';

export class GridElement extends Part {
  render() {
    const { image, onDrop, onRemove, dataBlocked, dataProduct } = this.props;

    return (
      <div
        className="grid-item force-square"
        style={`background-image: url(${image})`}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        draggable={false}
        onClick={onRemove}
        data-blocked={dataBlocked}
        data-product={dataProduct}
      />
    );
  }
}
