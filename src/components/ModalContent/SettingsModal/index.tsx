import * as React from 'react';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import { DropZoneInput, FormBtn, SliderInput } from '#components/FormElements';
import { byte_size } from '#utils';
import { connect, ConnectedProps } from 'react-redux';
import { GlobalState } from '#interfaces';
import { updateSettings, closeModal } from '#store/actions';
import { equals, reject } from 'ramda';
import Scrollbar from '#components/shared/Scrollbar';

const iValue = {
  bg: {
    url: '',
    opacity: 0,
    blur: 0,
  },
  bookmarks: {
    category_columns: 0,
  },
};

const mapStateToProps = (state: GlobalState) => ({
  initialSettings: state.settings.settings,
});

const connector = connect(mapStateToProps, { updateSettings, closeModal });

type SettingsModalProps = Record<string, unknown> &
  ConnectedProps<typeof connector>;

const SettingsModal = (props: SettingsModalProps): React.ReactElement => {
  const { updateSettings, initialSettings, closeModal } = props;

  const [bodyHeight, setBodyHeight] = React.useState<number | undefined>(0);
  const bodyRef = React.useRef<null | HTMLDivElement>(null);

  React.useEffect(() => {
    setBodyHeight(bodyRef.current?.clientHeight);
  });

  return (
    <div className="settings">
      <div ref={bodyRef} className="settings__body">
        <Scrollbar autoHeight autoHeightMin={'75vh'}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
          repellendus beatae impedit aspernatur, sed possimus assumenda culpa
          delectus necessitatibus iusto voluptatum molestiae fuga hic qui non
          ducimus perferendis. Voluptatem sapiente impedit adipisci consequatur
          fugit enim, molestiae quam magnam provident saepe, perferendis dolore
          libero quas. Natus molestias aspernatur itaque obcaecati quidem
          repellendus quisquam iure adipisci nesciunt saepe. Facere pariatur
          repellendus soluta eum, fugiat commodi ipsam amet necessitatibus enim
          voluptate, incidunt laudantium exercitationem? Aliquam nihil dolores
          fuga esse quae! Voluptates voluptatum minus pariatur quia harum unde
          sequi, illum omnis numquam tempore nesciunt sit aliquid quidem? Ad sed
          corrupti eum asperiores voluptatibus quod ipsa aliquam quos libero
          tempore quae facere repellendus veritatis necessitatibus deserunt
          optio placeat, delectus quia harum obcaecati officia culpa natus?
          Libero nobis deleniti quo error, optio mollitia suscipit velit tempora
          non omnis nostrum aperiam. Ea, nisi ad accusamus iste obcaecati
          assumenda officiis, ullam eveniet necessitatibus provident earum,
          nostrum enim perspiciatis illum nemo? Dolor doloribus qui blanditiis
          consequuntur eius laborum labore nihil cumque ad. Modi, aut. Quis
          architecto iure libero dolorum sequi excepturi ratione necessitatibus,
          ea non, pariatur quo at? Impedit itaque modi doloribus repellat quos
          repellendus quod quas officiis vero, explicabo eaque illum rem
          suscipit tempore corporis quo quisquam minima sed adipisci ullam
          laborum libero facere consequuntur. Nobis architecto inventore debitis
          corporis earum vero ab provident soluta excepturi sequi quis,
          voluptatum vitae temporibus, laudantium, amet ullam nisi facilis
          reiciendis exercitationem! Animi harum numquam dolore nemo dolorum
          veritatis nobis, adipisci molestiae at, optio ullam. Saepe,
          voluptatibus modi corrupti id, laboriosam architecto quaerat illo
          inventore vel quam impedit, quos facere? Blanditiis quidem, porro sint
          voluptatum qui ab quam eaque consequatur quisquam recusandae,
          dignissimos ducimus dolorum. Voluptas commodi debitis unde numquam,
          veniam, facere veritatis officia pariatur repudiandae sequi odio neque
          tempore maiores deserunt sunt ducimus placeat suscipit! Magnam
          molestiae id reprehenderit. Autem maiores error veniam, hic
          dignissimos natus voluptatem ut ipsam dolore nulla ex porro cum iure
          nam enim nesciunt iste et omnis esse, a odio repudiandae dicta? Illo
          fugiat quasi quae laudantium? Nihil doloribus eum, vel dolores eaque
          animi odit quis commodi id corrupti, sed ad velit. Aliquam similique
          animi, optio eos ipsa molestias, officia ipsum ducimus quo rem atque
          exercitationem autem quasi, quisquam voluptate rerum. Expedita numquam
          consequatur aliquid tenetur odit quae vitae, laboriosam animi nemo
          laborum placeat culpa illum ab dolorum vel aliquam, id iste, sit
          tempore reprehenderit? Inventore accusantium veritatis nostrum aut
          porro eaque itaque molestias labore iusto? Quaerat sed placeat animi
          reprehenderit quis magnam cumque vel itaque illum! Possimus, qui. Id
          nisi odit omnis, optio enim quos magnam incidunt minima obcaecati,
          sapiente eligendi tenetur modi at voluptatibus tempore, facilis
          cupiditate? Quae accusantium consectetur eius enim magnam, inventore
          aut ducimus earum quia. Enim expedita, itaque culpa quis iure
          laboriosam ab dolore cum adipisci fuga consectetur quia cupiditate
          iste! Earum, architecto iure error facere distinctio veniam nam libero
          eum neque culpa, ratione eligendi voluptatibus aperiam at cumque
          dignissimos! Aut iste enim quae nesciunt fuga nam autem, consequatur
          eos, aspernatur perspiciatis cupiditate? Error architecto deserunt a.
          Commodi necessitatibus officiis perferendis quisquam quae, aperiam
          voluptatem dolore, officia quidem provident maiores iusto nisi sint.
          Ullam consequatur dolores consequuntur aspernatur ipsa praesentium
          cum, voluptate quo explicabo error illo, repudiandae nobis pariatur
          numquam! Nemo facilis asperiores eum doloremque, deleniti odio dolorem
          porro enim illum tempore temporibus voluptatum nam aliquam impedit
          deserunt velit ullam. Possimus aliquid, ab, saepe sit ex fugiat
          exercitationem ipsa quo deleniti animi iste eveniet dolores porro
          laudantium voluptatem suscipit maiores optio blanditiis libero
          dignissimos quis! Perferendis, ipsum eius. Ea porro perspiciatis
          explicabo sed tempore in, quisquam quibusdam impedit labore eveniet
          eius modi! Cum architecto ad officia autem est earum possimus nisi
          deserunt facere harum laudantium maxime veniam libero mollitia totam
          vero repellat fugiat temporibus, eveniet alias iste ipsam atque quos.
          Quam labore nostrum perferendis perspiciatis sit iusto magnam velit?
          Cupiditate tenetur eius corrupti! Totam maxime, eligendi quisquam a,
          quae quaerat itaque esse excepturi, odit reiciendis eos deleniti nisi!
          Sint delectus tenetur ex nemo cum qui repellat aliquam distinctio vero
          accusamus. Nihil ipsam quas unde optio reiciendis temporibus ratione
          quisquam corporis dolor praesentium modi, quidem, nulla aspernatur at.
          Optio, corporis. Reprehenderit, odit aut voluptatum est in asperiores.
          Voluptate repellendus ipsa laborum magnam, deleniti modi quos sint
          reprehenderit illum quibusdam soluta sequi quia distinctio pariatur,
          iste porro dicta corrupti. Mollitia quasi nulla minus voluptatem
          perspiciatis suscipit non nostrum ex, quod ad illum quae cum inventore
          repellat aliquid tempore laboriosam vero, necessitatibus ratione
          facere, autem delectus maxime quam reprehenderit! Ab eum itaque rerum
          molestiae minus adipisci quam, cum velit nobis dolores non cupiditate
          assumenda quisquam. Ullam esse error quos cum laboriosam rem! Tempore
          aliquid exercitationem corrupti quia amet facere unde pariatur a
          delectus doloremque, eligendi eum nisi esse officiis expedita error,
          tenetur illo explicabo molestiae ducimus! Similique enim quam,
          deleniti ratione illum suscipit magnam veniam amet iste blanditiis
          dicta, porro eaque quidem officia accusantium quibusdam esse eveniet
          voluptatum voluptas, voluptatem consectetur vero. Unde maiores dolorem
          accusantium vel nam. Deserunt eos modi cupiditate debitis est, hic,
          qui quod blanditiis atque neque placeat odio dolores quis! Libero quis
          numquam commodi soluta tempora pariatur autem accusantium sapiente
          optio quisquam, cum necessitatibus labore aliquam temporibus dolorum
          ullam ad illum tempore. Nesciunt ab nemo cumque suscipit sunt ducimus
          ipsum dolorem eligendi qui. Aut suscipit laboriosam iure possimus nisi
          cupiditate molestias numquam est nemo quis fugit commodi quia
          incidunt, a ipsum hic quibusdam dicta maiores? Cum sunt saepe, velit
          atque sapiente numquam quibusdam, nulla debitis, expedita dolor totam
          reprehenderit! Laboriosam molestias pariatur dolores sunt amet autem
          aspernatur, velit officia et quaerat ullam quidem. Vel neque
          perferendis at, fugiat exercitationem voluptatibus laudantium? Odio ad
          repellat repellendus, itaque inventore consequuntur laborum mollitia
          corrupti impedit amet exercitationem corporis rerum ullam. Optio,
          magni? Eos reiciendis veritatis perferendis autem, odio nobis
          distinctio consequatur earum dignissimos, incidunt ab fuga repellendus
          ad id sapiente corrupti quo officia itaque consectetur. Vero tempore
          similique necessitatibus natus asperiores facere, quibusdam voluptatem
          quo maiores. Necessitatibus vitae quisquam repudiandae ipsa nihil a
          velit ducimus mollitia eos. Ad, temporibus. Asperiores, fuga
          architecto, saepe fugiat similique quibusdam sint placeat quidem sequi
          inventore perspiciatis, illum atque? ad id sapiente corrupti quo
          officia itaque consectetur. Vero tempore similique necessitatibus
          natus asperiores facere, quibusdam voluptatem quo maiores.
          Necessitatibus vitae quisquam repudiandae ipsa nihil a velit ducimus
          mollitia eos. Ad, temporibus. Asperiores, fuga architecto, saepe
          fugiat similique quibusdam sint placeat quidem sequi inventore
          perspiciatis, illum atque? ad id sapiente corrupti quo officia itaque
          consectetur. Vero tempore similique necessitatibus natus asperiores
          facere, quibusdam voluptatem quo maiores. Necessitatibus vitae
          quisquam repudiandae ipsa nihil a velit ducimus mollitia eos. Ad,
          temporibus. Asperiores, fuga architecto, saepe fugiat similique
          quibusdam sint placeat quidem sequi inventore perspiciatis, illum
          atque? ad id sapiente corrupti quo officia itaque consectetur. Vero
          tempore similique necessitatibus natus asperiores facere, quibusdam
          voluptatem quo maiores. Necessitatibus vitae quisquam repudiandae ipsa
          nihil a velit ducimus mollitia eos. Ad, temporibus. Asperiores, fuga
          architecto, saepe fugiat similique quibusdam sint placeat quidem sequi
          inventore perspiciatis, illum atque?
        </Scrollbar>
      </div>
    </div>
  );
};

export default connector(SettingsModal);
