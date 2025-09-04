import { UseState } from '@/types';
import { State } from '@/state';

type RenderProps = {
  useState: <T = any>(value: T) => UseState<T>;
};

class Framework extends State {
  public _render = this.render.bind(this);

  onRefresh() {
    this._render(this.utils);
  }

  public render({ useState }: RenderProps = this.utils) {
    const [alpha, setAlpha] = useState<boolean>(false);
    const [bravo, setBravo] = useState<number>(0);
    console.log(`[alpha::${alpha}]\n`);
    console.log(`Bravo:`, bravo.toString().padStart(2, '0'));
    const increment = () => setBravo((bravo) => bravo + 1);

    if (alpha && bravo < 10) {
      setTimeout(increment, 750);
    }

    if (!alpha) {
      console.log(`[initiating timeout]`)
      setTimeout(() => {
        setAlpha((prev: boolean) => !prev);
      }, 750);
    }
  }
}

(new Framework()).render();
