module.exports = grammar({
  name: "a6502",
  rules: {
    asm: ($) => repeat($.inst),

    inst: ($) =>
      choice(
        $.acc_opc,
        $.abs_opc,
        $.abs_x_opc,
        $.abs_y_opc,
        $.imm_opc,
        $.impl_opc,
        $.ind_opc,
        $.x_ind_opc,
        $.ind_y_opc,
        $.rel_opc,
        $.zpg_opc,
        $.zpg_x_opc,
        $.zpg_y_opc
      ),

    /*
     * ADDRESS MODES
     */

    /*
     * OPC A
     */
    acc_opc: ($) => choice(...[
      $.asl_opc,
      $.rol_opc,
      $.ror_opc,
    ].map((op) => seq(op, optional($.a_reg)))),

    /*
     * OPC $LLHH
     */
    abs_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.asl_opc,
      $.bit_opc,
      $.cmp_opc,
      $.cpx_opc,
      $.cpy_opc,
      $.dec_opc,
      $.eor_opc,
      $.inc_opc,
      $.jmp_opc,
      $.jsr_opc,
      $.lda_opc,
      $.ldx_opc,
      $.ldy_opc,
      $.lsr_opc,
      $.ora_opc,
      $.rol_opc,
      $.ror_opc,
      $.sbc_opc,
    ].map((op) => seq(op, $.num_16))),

    /*
     * OPC $LLHH,X
     */
    abs_x_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.asl_opc,
      $.cmp_opc,
      $.dec_opc,
      $.eor_opc,
      $.inc_opc,
      $.lda_opc,
      $.ldy_opc,
      $.lsr_opc,
      $.ora_opc,
      $.rol_opc,
      $.ror_opc,
      $.sbc_opc,
    ].map((op) => seq(op, $.num_16, ",", $.x_reg))),

    /*
     * OPC $LLHH,Y
     */
    abs_y_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.cmp_opc,
      $.eor_opc,
      $.lda_opc,
      $.ldx_opc,
      $.ora_opc,
      $.sbc_opc,
    ].map((op) => seq(op, $.num_16, ",", $.y_reg))),

    /*
     * OPC #$BB
     */
    imm_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.cmp_opc,
      $.cpx_opc,
      $.cpy_opc,
      $.eor_opc,
      $.lda_opc,
      $.ldx_opc,
      $.ldy_opc,
      $.lsr_opc,
      $.ora_opc,
      $.sbc_opc,
    ].map((op) => seq(op, "#", $.num_8))),

    /*
     * OPC
     */
    impl_opc: ($) => choice(
      $.brk_opc,
      $.clc_opc,
      $.cld_opc,
      $.cli_opc,
      $.clv_opc,
      $.dex_opc,
      $.dey_opc,
      $.inx_opc,
      $.iny_opc,
      $.nop_opc,
      $.pha_opc,
      $.php_opc,
      $.pla_opc,
      $.plp_opc,
      $.rti_opc,
      $.rts_opc,
      $.sec_opc,
      $.sed_opc,
    ),

    /*
     * OPC ($LLHH)
     */
    ind_opc: ($) => choice(...[
      $.jmp_opc,
    ].map((op) => seq(op, "(", $.num_16, ")"))),

    /*
     * OPC ($LL,X)
     */
    x_ind_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.cmp_opc,
      $.eor_opc,
      $.lda_opc,
      $.ora_opc,
      $.sbc_opc,
    ].map((op) => seq(op, "(", $.num_8, ",", $.x_reg, ")"))),

    /*
     * OPC ($LL),Y
     */
    ind_y_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.cmp_opc,
      $.eor_opc,
      $.lda_opc,
      $.ora_opc,
      $.sbc_opc,
    ].map((op) => seq(op, "(", $.num_8, ")", ",", $.y_reg))),

    /*
     * OPC $BB
     */
    rel_opc: ($) => choice(...[
      $.bcc_opc,
      $.bcs_opc,
      $.beq_opc,
      $.bmi_opc,
      $.bne_opc,
      $.bpl_opc,
      $.bvc_opc,
      $.bvs_opc,
    ].map((op) => seq(op, $.num_16))),

    /*
     * OPC $LL
     */
    zpg_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.asl_opc,
      $.bit_opc,
      $.cmp_opc,
      $.cpx_opc,
      $.cpy_opc,
      $.dec_opc,
      $.eor_opc,
      $.inc_opc,
      $.lda_opc,
      $.ldx_opc,
      $.ldy_opc,
      $.lsr_opc,
      $.ora_opc,
      $.rol_opc,
      $.ror_opc,
      $.sbc_opc,
    ].map((op) => seq(op, $.num_8))),

    /*
     * OPC $LL,X
     */
    zpg_x_opc: ($) => choice(...[
      $.adc_opc,
      $.and_opc,
      $.asl_opc,
      $.cmp_opc,
      $.dec_opc,
      $.eor_opc,
      $.inc_opc,
      $.lda_opc,
      $.ldy_opc,
      $.lsr_opc,
      $.ora_opc,
      $.rol_opc,
      $.ror_opc,
      $.sbc_opc,
    ].map((op) => seq(op, $.num_8, ",", $.x_reg))),

    /*
     * OPC $LL,Y
     */
    zpg_y_opc: ($) => choice(...[
      $.ldx_opc,
    ].map((op) => seq(op, $.num_8, ",", $.y_reg))),

    /*
     * INSTRUCTIONS
     */

    adc_opc: ($) => /[Aa][Dd][Cc]/,
    and_opc: ($) => /[Aa][Nn][Dd]/,
    asl_opc: ($) => /[Aa][Ss][Ll]/,
    bcc_opc: ($) => /[Bb][Cc][Cc]/,
    bcs_opc: ($) => /[Bb][Cc][Ss]/,
    beq_opc: ($) => /[Bb][Ee][Qq]/,
    bit_opc: ($) => /[Bb][Ii][Tt]/,
    bmi_opc: ($) => /[Bb][Mm][Ii]/,
    bne_opc: ($) => /[Bb][Nn][Ee]/,
    bpl_opc: ($) => /[Bb][Pp][Ll]/,
    brk_opc: ($) => /[Bb][Rr][Kk]/,
    bvc_opc: ($) => /[Bb][Vv][Cc]/,
    bvs_opc: ($) => /[Bb][Vv][Ss]/,
    clc_opc: ($) => /[Cc][Ll][Cc]/,
    cld_opc: ($) => /[Cc][Ll][Dd]/,
    cli_opc: ($) => /[Cc][Ll][Ii]/,
    clv_opc: ($) => /[Cc][Ll][Vv]/,
    cmp_opc: ($) => /[Cc][Mm][Pp]/,
    cpx_opc: ($) => /[Cc][Pp][Xx]/,
    cpy_opc: ($) => /[Cc][Pp][Yy]/,
    dec_opc: ($) => /[Dd][Ee][Cc]/,
    dex_opc: ($) => /[Dd][Ee][Xx]/,
    dey_opc: ($) => /[Dd][Ee][Yy]/,
    eor_opc: ($) => /[Ee][Oo][Rr]/,
    inc_opc: ($) => /[Ii][Nn][Cc]/,
    inx_opc: ($) => /[Ii][Nn][Xx]/,
    iny_opc: ($) => /[Ii][Nn][Yy]/,
    jmp_opc: ($) => /[Jj][Mm][Pp]/,
    jsr_opc: ($) => /[Jj][Ss][Rr]/,
    lda_opc: ($) => /[Ll][Dd][Aa]/,
    ldx_opc: ($) => /[Ll][Dd][Xx]/,
    ldy_opc: ($) => /[Ll][Dd][Yy]/,
    lsr_opc: ($) => /[Ll][Ss][Rr]/,
    nop_opc: ($) => /[Nn][Oo][Pp]/,
    ora_opc: ($) => /[Oo][Rr][Aa]/,
    pha_opc: ($) => /[Pp][Hh][Aa]/,
    php_opc: ($) => /[Pp][Hh][Pp]/,
    pla_opc: ($) => /[Pp][Ll][Aa]/,
    plp_opc: ($) => /[Pp][Ll][Pp]/,
    rol_opc: ($) => /[Rr][Oo][Ll]/,
    ror_opc: ($) => /[Rr][Oo][Rr]/,
    rti_opc: ($) => /[Rr][Tt][Ii]/,
    rts_opc: ($) => /[Rr][Tt][Ss]/,
    sbc_opc: ($) => /[Ss][Bb][Cc]/,
    sec_opc: ($) => /[Ss][Ee][Cc]/,
    sed_opc: ($) => /[Ss][Ee][Dd]/,
    sei_opc: ($) => /SEI/i, // set interrupt disable
    sta_opc: ($) => /STA/i, // store accumulator
    stx_opc: ($) => /STX/i, // store X
    sty_opc: ($) => /STY/i, // store Y
    tax_opc: ($) => /TAX/i, // transfer accumulator to X
    tay_opc: ($) => /TAY/i, // transfer accumulator to Y
    tsx_opc: ($) => /TSX/i, // transfer stack pointer to X
    txa_opc: ($) => /TXA/i, // transfer X to accumulator
    tcs_opc: ($) => /TSX/i, // transfer X to stack pointer
    tya_opx: ($) => /TYA/i, // transfer Y to accumulator

    num_8: ($) => choice($.hex_num_8, $.dec_num_8, $.bin_num_8),

    hex_num_8: ($) => seq("$", /0*[0-9a-fA-F]{1,2}/),
    dec_num_8: ($) => /0*(25[0-5]|2[0-4][0-9]|[01]?[0-9]{1,2})/,
    bin_num_8: ($) => seq("%", /0*[01]{1,8}/),

    num_16: ($) => choice($.hex_num_16, $.dec_num_16, $.bin_num_16),

    hex_num_16: ($) => seq("$", /0*[0-9a-fA-F]{3,4}/),
    dec_num_16: ($) =>
      /0*(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]?\d{1,4})/,
    bin_num_16: ($) => seq("%", /0*[01]{9,16}/),

    /*
     * REGISTERS
     */

    a_reg: ($) => /[aA]/,
    x_reg: ($) => /[xX]/,
    y_reg: ($) => /[yY]/,
  },
});
